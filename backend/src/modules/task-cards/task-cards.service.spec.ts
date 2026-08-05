import { TaskCardsService } from './task-cards.service';
test('task card cannot sign off with unsigned steps',()=>{expect(()=>new TaskCardsService().validateTransition('AWAITING_INSPECTION','SIGNED_OFF',{steps:[{}],parts:[]})).toThrow('unsigned steps');});
test('offline sync is idempotent',()=>{const s=new TaskCardsService();const a=s.syncOperation({operationId:'1',type:'STEP',payload:{}});expect(s.syncOperation({operationId:'1',type:'STEP',payload:{}})).toBe(a);});
