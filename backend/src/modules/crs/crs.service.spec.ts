import { CrsService } from './crs.service';
test('CRS gate refuses open blocking item',()=>{expect(()=>new CrsService().assertCanIssue({prerequisites:[{code:'QA',required:true}],checks:[{prerequisiteCode:'QA',passed:true}],openItems:[{blocking:true}]})).toThrow('unresolved blocking');});
