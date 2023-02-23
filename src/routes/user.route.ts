import { UserController } from "../controllers/user.controller";

export function userRoute(app:any){
  app.post('/api/user', (request: any, reply: any) => {
    UserController.create(request, reply)
  });
  
  app.get('/api/user', (request: any, reply: any) => {
    UserController.fetch(request, reply)
  });

  app.get('/api/user/:id', (request: any, reply: any) => {
    UserController.get(request, reply)
  });
  
  app.put('/api/user/:id', (request: any, reply: any) => {
    UserController.update(request, reply)
  });
  
  app.delete('/api/user/:id', (request: any, reply: any) => {
    UserController.delete(request, reply)
  });
};