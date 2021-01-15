import { Request, Response } from 'express';
import Drink  from "../../entity/Drinks"
export default async (req: Request, res: Response): Promise<void> => {
	const detail = await Drink.detailView(2);
	if (detail){
		res.send(detail)
	} else {
		res.send({"message": "error message "})
	}
};
