import { formComponent } from "./form-component.js";
import { resultComponent } from "./table-component.js";

const viewController = {
    render:()=>{
        formComponent.render();
        resultComponent.render();
    },

    update:(userArray, userToUpdate)=>{        
        resultComponent.update(userArray);
        formComponent.update(userToUpdate);
    },

    updateForm:(userToUpdate)=>{ 
        formComponent.update(userToUpdate);
    }
}

export {view}