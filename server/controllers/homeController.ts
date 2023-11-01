import { Request, Response } from "express";


export const index = (req: Request, res: Response) => {
    res.render('main', {
        layout: 'index'
    })
}

export const loader = (req: Request, res: Response) => {
    res.render('loader', {
        layout: "index",
    })
}

export const menu = (req: Request, res: Response) => {
    res.render('menu', {
        layout: "index",
    })
}

export const register = (req: Request, res: Response) => {
    res.render('reg', {
        layout: 'index'
    })
}

export const game_room = (req: Request, res: Response) => {
    res.render('game-room', {
        layout: 'index'
    })
}
