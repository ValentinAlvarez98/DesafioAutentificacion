export function isAdmin(email, password) {

      const admin = {
            first_name: "Admin",
            last_name: "Coder",
            email: "admincoder@coder.com",
            password: "adminCod3r123",
            role: "admin"
      };

      if (email === admin.email && password === admin.password) {
            return admin;
      } else {
            return false;
      };

};

export function checkSession(req, res, next) {

      if (req.session && req.cookies.userData) {

            next();

      } else {

            console.log("No hay ninguna sesión iniciada");
            res.redirect('/');

      };

};

export function validateEmail(email) {

      if (/^\w+([\.-]?\w+)*@(?:|hotmail|outlook|gmail)\.(?:|com|es)+$/i.test(email) === false) {
            return true;
      } else {
            return false;
      };
}

export function checkGithubSession(req, res, next) {

      const email = req.cookies.userData.email;

      if (validateEmail(email)) {

            res.redirect('/profile');

      } else {

            next();

      };

};

export function cfgSession(user, req, res) {

      if (user) {

            req.session.userLogged = true;

            req.session.user = user._id;

            if (user.role === "admin") {

                  res.cookie('userData', {
                        first_name: user.first_name,
                        role: user.role
                  }, {
                        maxAge: 60000
                  });


            } else {

                  res.cookie('userData', {
                        id: user._id,
                        first_name: user.first_name,
                        role: user.role,
                        email: user.email
                  }, {
                        maxAge: 900000
                  })

            };
            res.send({
                  status: "success",
                  payload: `El usuario ${user.first_name} ${user.last_name} se ha logueado correctamente`
            });


      } else {
            res.status(401).send({
                  status: "error",
                  payload: `Error en el usuario o contraseña`
            });

      };

};

export function cfgSessionGithub(user, req, res) {

      if (user) {

            req.session.userLogged = true;

            req.session.user = user._id;

            res.cookie('userData', {
                  id: user._id,
                  first_name: user.first_name,
                  role: user.role,
                  email: user.email
            })

            res.redirect('/profile');


      } else {

            res.redirect('/login');

      };

};


export function ifSession(req, res, next) {

      if (req.session && req.cookies.userData) {

            res.redirect('/products');

      } else {

            next();

      };

};