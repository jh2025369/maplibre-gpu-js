import {createLayout} from '../../util/struct_array';

const layout = createLayout([
    {name: 'a_pos',          components: 2, type: 'Float32'},
    {name: 'a_normal_ed',    components: 4, type: 'Float32'},
], 4);

export const centroidAttributes = createLayout([
    {name: 'a_centroid', components: 2, type: 'Float32'}
], 4);

export default layout;
export const {members, size, alignment} = layout;
