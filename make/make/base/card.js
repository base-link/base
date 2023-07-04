let ID = 1;
class BaseCard {
    link;
    seed;
    id;
    constructor(link) {
        this.id = ID++;
        this.link = link;
        this.seed = {};
    }
    bind(seed) {
        // diff the values
        this.seed = seed;
    }
    free() {
        this.seed = {};
    }
}
export { BaseCard };
//# sourceMappingURL=card.js.map