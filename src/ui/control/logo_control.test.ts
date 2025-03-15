import {createMap as globalCreateMap, beforeMapTest} from '../../util/test/util';

function createMap(logoPosition, maplibreLogo) {

    const mapobj = {
        logoPosition,
        maplibreLogo,
        style: {
            version: 8,
            sources: {},
            layers: []
        }
    };

    return globalCreateMap(mapobj, undefined);
}

beforeEach(() => {
    beforeMapTest();
});

describe('LogoControl', () => {
    test('does not appear by default', async () => {
        const map = createMap(undefined, undefined);
        await map.once('load');
        expect(map.getContainer().querySelectorAll(
            '.maplibregpu-ctrl-logo'
        )).toHaveLength(0);
    });

    test('is not displayed when the maplibreLogo property is false', done => {
        const map = createMap(undefined, false);
        map.on('load', () => {
            expect(map.getContainer().querySelectorAll(
                '.maplibregpu-ctrl-logo'
            )).toHaveLength(0);
            done();
        });
    });

    test('appears in bottom-left when maplibreLogo is true and logoPosition is undefined', done => {
        const map = createMap(undefined, true);
        map.on('load', () => {
            expect(map.getContainer().querySelectorAll(
                '.maplibregpu-ctrl-bottom-left .maplibregpu-ctrl-logo'
            )).toHaveLength(1);
            done();
        });
    });

    test('appears in the position specified by the position option', done => {
        const map = createMap('top-left', true);
        map.on('load', () => {
            expect(map.getContainer().querySelectorAll(
                '.maplibregpu-ctrl-top-left .maplibregpu-ctrl-logo'
            )).toHaveLength(1);
            done();
        });
    });

    test('appears in compact mode if container is less then 640 pixel wide', () => {
        const map = createMap(undefined, true);
        const container = map.getContainer();

        Object.defineProperty(map.getCanvasContainer(), 'offsetWidth', {value: 645, configurable: true});
        map.resize();
        expect(
            container.querySelectorAll('.maplibregpu-ctrl-logo:not(.maplibregpu-compact)')
        ).toHaveLength(1);

        Object.defineProperty(map.getCanvasContainer(), 'offsetWidth', {value: 635, configurable: true});
        map.resize();
        expect(
            container.querySelectorAll('.maplibregpu-ctrl-logo.maplibregpu-compact')
        ).toHaveLength(1);
    });

    test('has `rel` nooper and nofollow', done => {
        const map = createMap(undefined, true);

        map.on('load', () => {
            const container = map.getContainer();
            const logo = container.querySelector('.maplibregpu-ctrl-logo');
            expect(logo).toHaveProperty('rel', 'noopener nofollow');
            done();
        });
    });
});
