const Pref = {
   states: [],
   onStateChanged: [],

   stateInvoke() {
      this.onStateChanged?.map((stateFun) => {
         return stateFun?.(this.states);
      });
   },
};

module.exports = Pref;
