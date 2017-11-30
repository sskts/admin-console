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
