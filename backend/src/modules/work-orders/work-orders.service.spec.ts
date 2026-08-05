import { WorkOrdersService } from './work-orders.service';
test('rejects invalid work order transition',()=>{expect(()=>new WorkOrdersService().validateTransition('OPEN','COMPLETED')).toThrow('Invalid work order transition');});
test('requires identity-bound signoff before signed off state',()=>{expect(()=>new WorkOrdersService().validateTransition('AWAITING_SIGNOFF','SIGNED_OFF',false)).toThrow('requires recorded signoff');});
