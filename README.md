# test-querys

https://arctype.com/blog/rest-api-tutorial/

https://stackoverflow.com/questions/60928216/how-can-i-make-my-node-js-mysql-connection-as-a-promise-work

[https://stackoverflow.com/questions/48129401/use-mysql-with-promises-in-node-js](https://stackoverflow.com/questions/70005844/connect-to-mysql-using-promise-mysql-in-nodejs)

const getaut = async (data) => {
    return new Promise((resolve, reject) => {
        try {
            con.locU().then(function (pool) {
                console.log("--CONEXON ESTABLECIDA--");
                pool.getConnection(function (err, conn) {
                    if (err) {
                        resolve({ success: false });
                    } else {
                        console.log("--ARRANCA QUERY --");

                        let sql = `SELECT * FROM FenixU.cr_autq a LEFT JOIN cr_autqi i ON a.AutQId = i.AutQId ${data.AutQId ? 'WHERE a.AutQId =' + data.AutQId : ''}`

                        conn.query(sql, function (err, rows) {
                            conn.release();
                            pool.end();
                            if (err) {
                                console.log('----ERROR COMUNICACIÓN----');
                                console.log(err);
                            } else {
                                resolve(rows);
                                console.log('----COMUNICACION TEMRINADA----');
                            }
                        })
                    }
                })
            })
        } catch {
            console.log("--Error--");
        }
    }).catch(function (error) {
        console.log("--ERROR  COMUNICACIÓN--")
    });
}

SistemasRouter.get("/getaut/", async (req, res) => {
    try {
        const data = req.query
        const rows = await sistemas.getaut(data);
        res.json({ rows });
    } catch {
        console.log('---ERROR RESPUESTA---');
    }
});

/*/*/*/

const getcatbyId = async (data) => {
    return new Promise((resolve, reject) => {
        try {
            try {
                try {
                    con.loc().then(function (pool) {
                        console.log("--CONEXION ESTABLECIDA--");
                        pool.getConnection(function (err, conn) {
                            if (err) {
                                resolve({ success: false });
                            } else {
                                console.log("--ARRANCA QUERY --");
                                conn.query('SELECT 1');
                                conn.query('SET CHARACTER SET "utf8"');
                                conn.query('SET NAMES UTF8');

                                conn.query('SELECT * FROM art , cat WHERE art.CatId = cat.CatId and cat.CatId = ' + data.CatId

                                    , function (err, rows) {
                                        if (err) {
                                            console.log('----ERROR COMUNICACIÓN----');
                                            console.log(err);
                                        } else {
                                            resolve(rows);
                                            conn.release();
                                            pool.end();
                                            console.log('----COMUNICACION TEMRINADA----');
                                        }
                                    })
                            }
                        })
                    }).catch(function (error) {
                        console.log("--ERROR--")
                    });
                } catch {
                    console.log('----ERROR COMUNICACIÓN : Metodo----')
                }
            } catch {
                console.log("--Error Servidor : Query--");
            }
        } catch {
            console.log("--Error Servidor: Conexion--");
        }
    })
};

SistemasRouter.get("/getartbycat/", async (req, res) => {
    try {
        var catId = req.body.CatId;
        const rows = await sistemas.getcatbyId({ catId });
        res.json({ rows });
    } catch {
        console.log('---ERROR RESPUESTA---');
    }
});
