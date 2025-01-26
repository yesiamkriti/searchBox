import grpc from '@grpc/grpc-js';
import connectDB from './../db.js';

const db = await connectDB();
const questionsCollection = db.collection('col_ques');

const searchQuestion = async (call, callback) => {
  try {
    const { query, type, page, limit } = call.request;

    // Default values for pagination
    const pageNumber = page || 1;
    const pageSize = limit || 10;

    // Construct the search query
    const searchQuery = {
      ...(query && { title: { $regex: query, $options: 'i' } }),
      ...(type && { type }),
    };

    console.log('Search Query:', searchQuery); // Log the query

    // Fetch results
    const totalDocs = await questionsCollection.countDocuments(searchQuery);
    const questions = await questionsCollection
      .find(searchQuery)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .toArray();

    console.log('Matched Questions:', questions); // Log the results

    const totalPages = Math.ceil(totalDocs / pageSize);

    // Prepare the response
    callback(null, {
      questions: questions.map(({ title, type, solution, blocks }) => ({
        title,
        type,
        solution,
        blocks: blocks.map(({ text, showInOption, isAnswer }) => ({
          text,
          showInOption,
          isAnswer,
        })),
      })),
      totalPages,
    });
  } catch (error) {
    console.error('Error in SearchQuestions:', error.message);
    callback({
      code: grpc.status.INTERNAL,
      message: 'An error occurred while searching questions.',
    });
  }
};

  
  export default searchQuestion;