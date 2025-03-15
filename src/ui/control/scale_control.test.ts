import {createMap, beforeMapTest} from '../../util/test/util';
import {ScaleControl} from './scale_control';

beforeEach(() => {
    beforeMapTest();
});

describe('ScaleControl', () => {
    test('appears in bottom-left by default', () => {
        const map = createMap(undefined, undefined);
        map.addControl(new ScaleControl(undefined));

        expect(
            map.getContainer().querySelectorAll('.maplibregpu-ctrl-bottom-left .maplibregpu-ctrl-scale')
        ).toHaveLength(1);
    });

    test('appears in the position specified by the position option', () => {
        const map = createMap(undefined, undefined);
        map.addControl(new ScaleControl(undefined), 'top-left');

        expect(
            map.getContainer().querySelectorAll('.maplibregpu-ctrl-top-left .maplibregpu-ctrl-scale')
        ).toHaveLength(1);
    });

    test('should change unit of distance after calling setUnit', () => {
        const map = createMap(undefined, undefined);
        const scale = new ScaleControl(undefined);
        const selector = '.maplibregpu-ctrl-bottom-left .maplibregpu-ctrl-scale';
        map.addControl(scale);

        let contents = map.getContainer().querySelector(selector).innerHTML;
        expect(contents).toMatch(/km/);

        scale.setUnit('imperial');
        contents = map.getContainer().querySelector(selector).innerHTML;
        expect(contents).toMatch(/mi/);
    });

    test('should respect the maxWidth regardless of the unit and actual scale', () => {
        const map = createMap(undefined, undefined);
        const maxWidth = 100;
        const scale = new ScaleControl({maxWidth, unit: 'nautical'});
        const selector = '.maplibregpu-ctrl-bottom-left .maplibregpu-ctrl-scale';
        map.addControl(scale);
        map.setZoom(12.5);

        const el = map.getContainer().querySelector(selector) as HTMLElement;
        expect(parseFloat(el.style.width) <= maxWidth).toBeTruthy();
    });
});
