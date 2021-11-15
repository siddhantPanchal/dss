const Pref = {
   states: [],
   onStateChanged: [],

   stateInvoke() {
      this.onStateChanged?.map((stateFun) => {
         return stateFun?.();
      });
   },
};

module.exports = Pref;
