import { ProjectModule } from "../models/project.model";


export class ProjectController{
  static async create (request: any, reply: any) {
    try {
      const project = request.body;
      const newProject = await ProjectModule.create(project);
      reply.send(newProject);
    } catch (e) {
      reply.send(e);
    }
  }
  
  static async fetch (request: any, reply: any) {
    try {
      const projects = await ProjectModule.find({});
      reply.send(projects);
    } catch (e) {
      reply.send(e);
    }
  }
  
 static async get (request: any, reply: any) {
  try {
    const projectId = request.params.id;
    const project = await ProjectModule.findById(projectId);
    reply.send(project);
  } catch (e) {
    reply.send(e);
  }
}
};