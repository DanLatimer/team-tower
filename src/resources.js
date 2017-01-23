export const Resources = {
    images: [
        {name: 'basicWall', path: 'images/basicWall.png'},
        {name: 'youLose', path: 'images/youLose.png'},
        {name: 'youWin', path: 'images/youWin.png'},
        {name: 'gridBackground', path: 'images/grid_background.jpg'},
        {name: 'slow', path: 'images/slow.png'},
        {name: 'medium', path: 'images/medium.png'},
        {name: 'fast', path: 'images/fast.png'},
        {name: 'sell', path: 'images/sell.png'},
    ],
    spriteSheets: [
        {name: 'slime', path: 'images/slime.png', width: 36, height: 36, frames: 16},
        {name: 'mummy', path: 'images/mummy.png', width: 37, height: 45, frames: 18},
        {name: 'zombie', path: 'images/zombie.png', width: 39, height: 40, frames: 16},
        {name: 'skeleton', path: 'images/skeleton.png', width: 36, height: 36, frames: 16},
        {name: 'fireElemental', path: 'images/fireElemental.png', width: 72, height: 72, frames: 16},
        {name: 'basicTurret', path:'images/cannon_anim.png', width: 64, height: 64, frames: 8}

    ],
    fonts: [
        {name: 'desyrel', png: 'fonts/desyrel.png', xml: 'fonts/desyrel.xml'}
    ],
    audios: {
        fx: [
            {name: 'shoot', path: 'audios/shoot.ogg'},
            {name: 'explode', path: 'audios/explode.ogg'},

        ],
        music: [
            {name: 'ambiance', path: 'audios/ambiance.ogg'},
            {name: 'themeMusic', path: 'audios/theme-music.wav'}
        ]
    }
};
