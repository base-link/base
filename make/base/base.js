import { BaseCard, code, } from '../index.js';
export { Base };
class Base {
    tasks;
    textMap;
    watchers;
    env;
    observersByModuleThenIdThenName;
    observersByModuleThenNameThenId;
    cardsByPath;
    cardsById;
    constructor() {
        this.tasks = [];
        this.textMap = {};
        this.watchers = {};
        this.env = {};
        this.observersByModuleThenIdThenName = {};
        this.observersByModuleThenNameThenId = {};
        this.cardsByPath = {};
        this.cardsById = {};
    }
    load(call) {
        call();
    }
    card(key) {
        if (code.isString(key)) {
            let card = this.cardsByPath[key];
            if (!card) {
                card = new BaseCard(key);
                this.cardsByPath[key] = card;
                this.cardsById[card.id] = card;
            }
            return card;
        }
        else {
            const card = this.cardsById[key];
            assertBaseCard(card);
            return card;
        }
    }
}
function assertBaseCard(object) {
    if (!(object instanceof BaseCard)) {
        code.throwError(code.generateObjectNotTypeError(object, ['base-card']));
    }
}
//# sourceMappingURL=base.js.map