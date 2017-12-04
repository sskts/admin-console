import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
    {
        title: 'Dashboard',
        icon: 'nb-home',
        link: '/pages/dashboard',
        home: true,
    },
    {
        title: 'FEATURES',
        group: true,
    },
    {
        title: 'Settings',
        icon: 'ion-settings',
        children: [
            {
                title: '劇場設定',
                link: '/pages/settings/movieTheaters',
            },
        ],
    },
    {
        title: 'Search',
        icon: 'nb-search',
        children: [
            {
                title: 'イベント検索',
                link: '/pages/search/events',
            },
            {
                title: '注文検索',
                link: '/pages/search/orders',
            },
        ],
    },
    {
        title: 'Telemetries',
        icon: 'nb-bar-chart',
        children: [
        ],
    },
    {
        title: 'Tests',
        icon: 'nb-gear',
        children: [
            {
                title: '負荷試験',
                link: '/pages/tests/loadtest',
            },
        ],
    },
];
