import { trigger, state, style, transition, animate } from '@angular/animations';

export const animations_shrinkInOut = [
    trigger('shrinkInOut', [
        state(
            'in',
            style({
                height: '*',
                display: 'table',
                overflow: 'visible'
            })
        ),
        state(
            'out',
            style({
                height: '0'
            })
        ),
        transition('out => in', animate('300ms ease-in')),
        transition('in => out', animate('300ms ease-out'))
    ])
];
