import { Request, Response } from 'express';
import { MeansureUnitRepository } from '../models/repositories/MeansureUnit.repository';

export class MeansureUnitController {

    async find(request: Request, response: Response) {
        const { id } = request.params;
        const meansureUnitRepository = new MeansureUnitRepository();
        const meansureUnit = await meansureUnitRepository.findByID(+id);
        return response.status(200).json(meansureUnit);
    }

    async show(request: Request, response: Response) {
        const meansureUnitRepository = new MeansureUnitRepository();
        const meansureUnit = await meansureUnitRepository.findAll();
        return response.status(200).json(meansureUnit);
    }


};