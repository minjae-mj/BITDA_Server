import { Request, Response } from 'express';
import { Connection, getConnection } from 'typeorm';
import Drink from '../../entity/Drinks';
export default async (req: Request, res: Response): Promise<void> => {

  try {
    const filteredWeaklist = await Drink.weakList(
      req.body.alcohol,
      req.body.type,
      req.body.price,
      req.body.taste,
      req.body.origin
    );
    const filteredStronglist = await Drink.strongList(
      req.body.alcohol,
      req.body.type,
      req.body.price,
      req.body.taste,
      req.body.origin
    ); 
	if (req.body.alcohol === '도수 있는 편') {
		filteredStronglist.map((data) => {
		  delete data.type;
		  delete data.price;
		  delete data.taste;
		  delete data.ingredient;
		  delete data.origin;
		  delete data.url;
		  delete data.desc;
		});
       res.send(filteredStronglist);
	  } else if(req.body.alcohol === '도수 낮은 편') {
	  filteredWeaklist.map((data) => {
        delete data.type;
        delete data.price;
        delete data.taste;
        delete data.ingredient;
        delete data.origin;
        delete data.url;
        delete data.desc;
      });
     res.send(filteredWeaklist);
    }
   
    
  } catch (err) {
    res.send({ message: 'error message ' });
  }
};
