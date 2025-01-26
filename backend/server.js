import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import searchQuestion from './services/searchQuestions.js';
import {PROTOFILE_PATH,GRPC_HOST,PROTO_FILE_LOAD_OPTIONS} from './config.js';


const packageDefinition = protoLoader.loadSync(PROTOFILE_PATH,PROTO_FILE_LOAD_OPTIONS);
const QuestionService = grpc.loadPackageDefinition(packageDefinition).QuestionService;

const startServer = async () => {

  const server = new grpc.Server();
  server.addService(QuestionService.service, { SearchQuestions: searchQuestion });

  server.bindAsync(GRPC_HOST, grpc.ServerCredentials.createInsecure(), (error,port) => {
    if(error){
      console.log(error);
    }else{
      console.log(`Server running at http://${GRPC_HOST}`);
    }
  });
};

startServer();
