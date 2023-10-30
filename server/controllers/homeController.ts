import { Request, Response } from "express";

export const register = (req: Request, res: Response) => {
    res.render('reg', {
        layout: 'index'
    })
}

export const index = (req: Request, res: Response) => {
    res.render('main', {
        layout: 'index'
    })
}

export const menu = (req: Request, res: Response) => {
    res.render('menu', {
        layout: "index",
    })
}
