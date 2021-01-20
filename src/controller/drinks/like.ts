import { Request, Response } from 'express';
import { Connection, getRepository, getConnection,ConnectionManager, createConnection} from 'typeorm';
import Drink from '../../entity/Drinks';
import User from '../../entity/User';
import { drinks } from '../../routes';
export default async (req: Request, res: Response): Promise<void> => {
	const id = res.locals.decodedId;
	   await getConnection()
	    .createQueryBuilder()
		.relation(User, 'drinks')
		.of(id)
		.add(req.body.drinkId);
		
	// 	res.send({"bookMark":"true"}) 
	// const checkBookMark = await getRepository(User)
	// .createQueryBuilder('user')
	// .leftJoinAndSelect('user.drinks', 'drinks')
	// .where('user.id = :id', { id: id })
	// .getOne();
	// const addLike = await getConnection()
	// .createQueryBuilder()
	// .relation(User,"drinks")
	// .of(id)
	// .add(req.body.drinkId)
	// if (!checkBookMark){
	//   res.send(addLike)
	// }

   // let connection =await createConnection();
	// const id = res.locals.decodedId;	
	
	// const drink1 = new Drink();
	// drink1.id = req.body.drinkId
	// await connection.manager.save(drink1);

	// const user = new User();
	// user.id = id;
	// user.drinks = [drink1];
	// await connection.manager.save(user);

	res.send({
		"bookMark": "true"
	})
};
