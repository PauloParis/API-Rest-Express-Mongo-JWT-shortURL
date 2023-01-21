

export const login = (req, res) => {
    res.json({
        ok: 'login'
    })
}

export const register = (req, res) => {
    console.log(req.body);
    res.json({
        ok: 'register'
    })
}