import { scopedWhere } from './station-scope.extension';
test('station scoping isolates non super admin records',()=>{expect(scopedWhere({}, {role:'TECHNICIAN',stationId:'DXB'})).toEqual({deletedAt:null,stationId:'DXB'});});
test('super admin can read all stations while soft deletes remain filtered',()=>{expect(scopedWhere({status:'OPEN'}, {role:'SUPER_ADMIN'})).toEqual({status:'OPEN',deletedAt:null});});
