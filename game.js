class Fighter {
    constructor(obj) {
        this.name = obj.name;
        this.attack = obj.attack;
        this.hitpoints = obj.hitpoints;
        this.totalHitpoints = obj.hitpoints;
    }
    getHitpoints() {
        return this.hitpoints;
    }
    setHitpoints(value) {
        this.hitpoints = value;
    }
    getTotalHitpoints() {
        return this.totalHitpoints;
    }
    setTotalHitpoints(value) {
        this.totalHitpointsx = value;
    }
    getAttack() {
        return this.attack;
    }
    setAttack(value) {
        this.attack = value;
    }
    isAlive() {
        return this.hitpoints > 0;
    }
    fight(enemy) {
        if (enemy === this) return "Ви б'єте самого себе";

        if (enemy.defenceValue && enemy instanceof Chempion) {
            enemy.totalHitpoints++;
            enemy.defenceValue = false;
            return 'Ваш опонент чемпіон і він блокував атаку';
        }
        if (this instanceof Chempion) {
            if (enemy.isAlive() && this.isAlive()) enemy.hitpoints -= this.attack;
            else return 'Ваш опонент мертвий або ви';

            this.attack = enemy.isAlive() ? this.attack : ++this.attack;
        } else if (this instanceof Monster) {
            if (enemy.isAlive() && this.isAlive()) {
                this.burst === 2 || this.burst === 1 ? (enemy.hitpoints -= this.attack * 2) : (enemy.hitpoints -= this.attack);
                this.burst--;
            } else return 'Ваш опонент мертвий або ви';

            if (!enemy.isAlive()) {
                this.hitpoints += enemy.totalHitpoints * 0.25;
                this.totalHitpoints += enemy.totalHitpoints * 0.1;
            }
        }
    }
}
class Chempion extends Fighter {
    defenceValue = false;
    constructor(obj) {
        super(obj);
    }
    heal() {
        this.hitpoints < this.totalHitpoints - 5 ? (this.hitpoints += 5) : console.log('Буде оверхіл, а це заборонено');
    }
    defence = () => (this.defenceValue = true);
}
class Monster extends Fighter {
    burst = 0;
    constructor(obj) {
        super(obj);
    }
    enrange = () => (this.burst = 2);
    fury() {
        if (this.hitpoints > 5) {
            this.totalHitpoints -= 5;
            this.hitpoints -= 5;
            this.attack += 2;
        } else {
            console.log('Cacannot execute this method if there is not enough hitpoints');
        }
    }
}

var hunter = new Chempion({ name: 'Rexxar', attack: 10, hitpoints: 60 });
var beast = new Monster({ name: 'Beast', attack: 8, hitpoints: 80 });
hunter.fight(beast);
console.log(beast.getHitpoints());
beast.enrange();
hunter.fight(beast);
console.log(beast.getHitpoints());
beast.fight(hunter);
console.log(hunter.getHitpoints());
hunter.fight(beast);
console.log(beast.getHitpoints());
beast.fight(hunter);
console.log(hunter.getHitpoints());
console.log(`end enrage`);
hunter.fight(beast);
console.log(beast.getHitpoints());
beast.fight(hunter);
console.log(hunter.getHitpoints());
hunter.fight(beast);
console.log(beast.getHitpoints());
beast.fight(hunter);
console.log(hunter.getHitpoints());
hunter.fight(beast);
console.log(beast.getHitpoints());
beast.fight(hunter);
console.log(hunter.getHitpoints());

hunter.defence();
beast.fight(hunter);
console.log(`total hipoins after defence = ${hunter.getTotalHitpoints()}`);
console.log(hunter.getHitpoints());
hunter.fight(beast);
console.log(beast.getHitpoints());

beast.fury();
console.log('fury next three values');
console.log(beast.getTotalHitpoints());
console.log(beast.getHitpoints());
console.log(beast.getAttack());

hunter.fight(beast);
console.log(beast.isAlive());
console.log(hunter.getAttack());
console.log(hunter.getHitpoints());
hunter.heal();
console.log(hunter.getHitpoints());
