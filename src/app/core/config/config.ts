
export let Config = {
    appElementTag: 'AVS',
    appId: '',
    baseUrl: '',
    import: [],
    appLang: 'ca',
    availableLangs: [
        { label: 'CAT', value: 'ca' },
        { label: 'ESP', value: 'es' }
    ],

    security: {
        mode: 'off',
        unauthenticatedView: 'no-autenticat',
        logoutView: 'logout',
        authenticatedDefaultView: 'inici',
        unauthorizedView: '/no-autoritzat',
        globalMessages: false,

        token: {
            oauth2: {
                grantType: '',
                clientCredentials: '',
                refresh: 'off', // on | off
                checktoken: {
                    mode: 'off' // local | remote | off
                }
            },
            jwt: {
                key: 'accessToken',
                refresh: 'on', // on | off
                checkToken: {
                    mode: 'local', // local | remote | off
                    key: 'refreshToken',
                    minValidity: 10,
                    endpoint: ''
                }
            },
            urlparams: false,
            storage: {
                provider: sessionStorage,
                key: '$auth_info'
            },

            header: {
                name: 'Authorization',
                prefix: 'Bearer',
                globals: []
            },

            refreshHeader: null
        },
        profile: {
            storage: {
                provider: sessionStorage,
                key: '$user_profile'
            },
            rolesProperty: 'permisos',
            permsProperty: 'permisos'
        },
        propietatsAplicacio: {
            storage: {
                provider: sessionStorage,
                key: 'propietats_aplicacio'
            }
        },
        cookies: {
            accessToken: 'JWT-TOKEN',
            refreshToken: 'JWT-REFRESH-TOKEN',
            domain: 'localhost',
            path: ['/']
        }
    },
    ui: {
        langselector: 'primeng', // std, primeng
        messages: 'growl', // inline, growl
        formatData: 'DD/MM/YYYY',
        formatDataHora: 'DD/MM/YYYY HH:mm:ss',
        formatHora: 'HH:mm',
        widthMinimMenuHorizontal: 1060,
        cacheKeyForcaSeleccioProfessional: 'forcaSeleccioProfessional',

        spinner: {
            maxTime: 60000
        }
    },

    api: {
        baseUrl: '',
        formatData: 'YYYY-MM-DD',
        formatDataHora: 'DDMMYYYYTHHmm',
        notificacions: {
            cerca: '/recurslist'
        },
        reserves: {
            select: {
                unitats: '/llistats/unitats',
                recursos: '/llistats/recursos'
            },
            cerca: '/llistats/reserves'
        },
        analytics: {
            url: '/analytics'
        },
        cc: {
            baseUrl: '',
            baseUrlNotSecured: '',
            tra: {
                baseUrl: '',
                expedient: '/cc/tra/expedient'
            }
        },
        logs: {
            baseUrl: '',
            report: ''
        }
    }
};
