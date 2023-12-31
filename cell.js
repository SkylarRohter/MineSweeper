class cell{
    constructor(isMine,isOpened,hasFlag){
        this.isMine = isMine;
        this.isOpened = isOpened;
        this.hasFlag = hasFlag;
    }
    
    changeMineState(){
        this.isMine = !this.isMine;
    }
    changeOpenedState(openedState){
        this.isOpened = openedState;
    }
    toggleFlag(){
        this.hasFlag = !this.hasFlag;
    }
    isMine(){
        return this.isMine;
    }
    isOpened(){
        return this.isOpened;
    }
    hasFlag(){
        return this.hasFlag;
    }
}