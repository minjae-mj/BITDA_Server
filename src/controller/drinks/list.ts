import { Request, Response } from 'express';
import Drink  from "../../entity/Drinks"

export default async (req: Request, res: Response): Promise<void> => {
	const drinkList = await Drink.allDrinkList();
	
	if (drinkList){
		res.send(drinkList)
	} else {
		res.send({"message": "error message "})
	}
};
