import App from '@/App.vue'
export default [{
        path: '/',
        redirect: '/home',
        name: 'Main',
        component: App,
        children: [{
            path: '/home',
            name: 'home',
            meta: {
                title: '战时状态',
                active: 'Main',
            },
            component: () =>
                import ('@/views/Wartime/index.vue')
        }],
    },
    {
        path: '/peacetime',
        name: 'peacetime',
        redirect: '/peacetime/index',
        component: App,
        children: [{
            path: '/peacetime/index',
            name: 'peacetimePage',
            meta: {
                title: '非战时状态',
                active: 'peacetime',
            },
            component: () =>
                import ('@/views/Peacetime/index.vue'),
        }]
    }
]