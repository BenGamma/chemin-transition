app.service 'authService', (ipCookie, userData) ->
    user: {},
    token: null,
    isAuthorize: () ->
        unless ipCookie(token) && ipCookie(mail)
            false
        userData.checkUser().then (result) ->
            console.log(result)



