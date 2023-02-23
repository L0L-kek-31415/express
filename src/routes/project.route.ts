import { ProjectController } from "../controllers/project.controller";


export function projectRoute (app: any) {
  app.post('/api/project', (request: any, reply: any) => {
    ProjectController.create(request, reply)
  });
  
  app.get('/api/project', (request: any, reply: any) => {
    ProjectController.fetch(request, reply)
  });
  
  app.get('/api/project/:id', (request: any, reply: any) => {
    ProjectController.get(request, reply)
  });
};