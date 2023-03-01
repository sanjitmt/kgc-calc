
function round(value, digit) {
    var m = Math.pow(10, digit);
    return Math.round(value * m) / m;
}

const autoAttack = {
    name: "Auto Attack",
    items: {
        damage: {
            name: "Damage",
            color: "orange",
            unit: "/Sec",
            value: (stats) => Math.round(stats.atk * stats.aspd) * utils.affix(stats.p1, stats.m3)
        }
    }
}
// =====Skills=====

const skills = {};
skills.mel = { autoAttack };
skills.mel.holyBladeGarnaA1 = {
    name: "Holy Blade Garna A1",
    items: {
        damage: {
            name: "Damage",
            unit: "/Sec",
            color: "orange",
            value: (stats) =>
                Math.round((stats.atk * (1.25 + (0.00015 * stats.sp) + 1) + 0.2 * stats.sp) * stats.aspd * utils.affix(stats.p1, stats.m3))
        },
        duration: {
            name: "Duration",
            unit: "Sec",
            color: "white",
            value: (stats) => Math.floor((stats.tier + 1) / 2) * 2
        }
    }
};
skills.mel.holyBladeGarnaA2 = {
    name: "Holy Blade Garna A2",
    items: {
        damage: {
            name: "Damage",
            unit: "/Sec",
            color: "orange",
            value: (stats) =>
                Math.round(stats.atk * (1.25 + (0.00015 * stats.sp) + 1) * stats.aspd * utils.affix(stats.p1, stats.m3))
        },
        duration: {
            name: "Duration",
            unit: "Sec",
            color: "white",
            value: (stats) => Math.floor((stats.tier + 1) / 2) * 2 + 2.5
        }
    }
};
skills.zuoyun = { autoAttack };
skills.zuoyun.enlarge = {
    name: "Enlarge A1",
    items: {
        damage: {
            name: "Enlarge",
            color: "orange",
            unit: "/Sec",
            value: (stats) => {
                // (stats.p1 * 0.7 + 1) * (stats.m3 * 0.4 + 1)
                stats.aspd = Math.min(60, (50 + stats.sp) / 100 + stats.aspd + 0.30);
                return Math.round(stats.atk * (1 + (1.0 / 3.0) + stats.p1 * 0.7) * (stats.m3 * 0.4 + 1) * stats.aspd);
            },
        },
        aspd: {
            name: "A.SPD",
            color: "green",
            unit: "/Sec",
            value: (stats) => {
                var lv1BaseSpd = table.lv1BaseSpd.zuoyun;
                return Math.min(60, ((50 + 30 + stats.sp) / 100) * lv1BaseSpd + stats.aspd);
            }
        },
        aspdNoCap: {
            name: "A.SPD(No Cap)",
            color: "green",
            unit: "/Sec",
            value: (stats) => {
                var lv1BaseSpd = table.lv1BaseSpd.zuoyun;
                return ((50 + 30 + stats.sp) / 100) * lv1BaseSpd + stats.aspd;
            }
        },
        duration: {
            name: "Duration",
            unit: "Sec",
            color: "white",
            value: (stats) => {
                var durations = [3, 5, 7, 10];
                return durations[Math.floor((stats.tier - 1) / 2)];
            }
        }
    }
};
skills.hela = {}
skills.hela.meteorA1 = {
    name: "Summon Meteor A1",
    items: {
        damage: {
            name: "Single Target Damage",
            unit: "/Sec",
            color: "blue",
            value: (stats) => {
                var meteorCount = skills.hela.meteorA1.items.count.value(stats);
                var castTime = skills.hela.meteorA1.items.castTime.value(stats);
                var rate = 1.0 / castTime;
                return Math.round(stats.sp * (1.66 * (meteorCount - 1) + 1.66 * 2) * rate);
            },
        },
        count: {
            name: "Meteor Count",
            unit: "Count",
            color: "white",
            value: (stats) => Math.floor(stats.tier / 2) + 3,
        },
        castTime: {
            name: "Cast Time",
            unit: "Sec",
            color: "white",
            value: (stats) => Math.max(1.5, 3 - stats.aspd),
        }
    }
};
skills.hela.meteorA2 = {
    name: "Summon Meteor A2",
    items: {
        damage: {
            name: "Single Target Damage",
            unit: "/Sec",
            color: "blue",
            value: (stats) => {
                var meteorCount = skills.hela.meteorA2.items.count.value(stats);
                var castTime = skills.hela.meteorA2.items.castTime.value(stats);
                var rate = 1.0 / castTime;
                return Math.round(stats.sp * 1.66 * 1.5 * meteorCount * rate);
            },
        },
        count: {
            name: "Meteor Count",
            unit: "Count",
            color: "white",
            value: (stats) => Math.floor(stats.tier / 2) + 3,
        },
        castTime: {
            name: "Cast Time",
            unit: "Sec",
            color: "white",
            value: (stats) => Math.max(1.5, 3 - stats.aspd),
        }
    }
};
skills.rossette = { autoAttack };
skills.rossette.giantSmite = {
    name: "Giant Smite",
    items: {
        damage: {
            name: "Damage",
            color: "blue",
            unit: "/Cast",
            value: (stats) => Math.round(stats.sp * 3)
        }
    }

}
skills.evan = { autoAttack };
skills.evan.crescentSlashA2 = {
    name: "Crescent Slash A2",
    items: {
        damage: {
            name: "Damage",
            color: "blue",
            unit: "/Cast",
            value: (stats) => Math.round(stats.sp),
        },
        hRange: {
            name: "Horizontal Range",
            color: "white",
            unit: "block",
            value: (stats) => Array.of(1, 1, 3, 3, 5, 5, 7)[stats.tier - 1]
        },
        emitsAura: {
            name: "Emits Aura",
            color: "blue",
            unit: "/Sec",
            value: (stats) =>
                Math.round(0.3 * stats.sp * stats.aspd),

        },
    }

};
skills.ren = { autoAttack };
skills.ren.fullBloom = {
    name: "Full Bloom",
    items: {
        damage: {
            name: "6 stacks or A2",
            unit: "/cast",
            color: "blue",
            value: (stats) => stats.sp * 6,
        }
    }
}
skills.priya = { autoAttack };
skills.priya.blizzard = {
    name: "Blizzard A1",
    items: {
        damage: {
            name: "Damage",
            color: "blue",
            unit: "/Cast",
            value: (stats) => Math.round(stats.sp * 1.6),
        }
    }

}
skills.shelda = { autoAttack };
skills.shelda.ironWill = {
    name: "Iron Will",
    items:
    {
        damage: {
            name: "Damage",
            color: "blue",
            unit: "/Cast",
            value: (stats) => {
                var skillM = [30, 30, 120, 120, 250, 250, 700]
                return Math.round((skillM[stats.tier - 1] + stats.sp) * 1.3 + 0.5 * stats.sp);
            }
        }
    }
}

skills.draco = { autoAttack };
skills.neria = { autoAttack };
skills.neria.annihilationTime = {
    name: "Annihilation Time",
    items: {
        damage: {
            name: "Damage",
            color: "orange",
            unit: "/Sec",
            value: (stats) => {
                var aspd = skills.neria.annihilationTime.items.aspd.value(stats);
                //var count=skills.heria.annihilationTime.count(stats);
                var atkM = skills.neria.annihilationTime.items.atkM.value(stats) / 100;
                //var hRange = [1, 3, 5, 7]
                return Math.round(stats.atk * atkM * 1.08 * aspd);
            },
        },
        count: {
            name: "Arrow Count",
            unit: "Count",
            color: "white",
            value: () => 4,
        },
        aspd: {
            name: "A.SPD",
            unit: "/Sec",
            color: "green",
            value: (stats) => {
                const aspds = [75, 82, 98, 106, 122, 131, 150];
                return round(aspds[stats.tier - 1] / 100, 2);
            },
        },
        atkM: {
            name: "ATK Modifier",
            unit: "%",
            color: "white",
            value: (stats) => {
                const atkM = [300, 300, 400, 400, 500, 500, 600];
                return Math.round(atkM[stats.tier - 1] + stats.sp / 10);
            },
        },
        duration: {
            name: "Duration",
            unit: "Sec",
            color: "white",
            value: (stats) => {
                var aspd = skills.neria.annihilationTime.items.aspd.value(stats);
                return 4 / aspd
            },
        }
    }
}



skills.zupitere = { autoAttack };
skills.kanak = { autoAttack };
skills.kanak.soulRip = {
    //castTime: 0.8
    items: {
        damage: {
            name: "Soul Rip(Max Stack)",
            color: "blue",
            unit: "/Cast",
            value: (stats) => {
                var lv8StackM = stats.level >= 8 ? 0.08 : 0;
                var stackM = 0.2;
                var stacks = skills.kanak.soulRip.items.maxCurseStacks.value(stats);
                return Math.round(stats.sp * (1 + stacks * (stackM + lv8StackM)));
            },
        },
        maxCurseStacks: {
            name: "Max Curse Stacks",
            unit: "Count",
            color: "white",
            value: (stats) => Array.of(6, 6, 9, 9, 12, 12, 15)[stats.tier - 1]
        }
    }
}

skills.rie = { autoAttack };
skills.alberon = { autoAttack };
skills.alberon.radianceOfLife = {
    name: "Radiance Of Life",
    items: {
        protection: {
            name: "Protection(w/ full HP)",
            unit: "point",
            color: "white",
            value: (stats) => {
                var protection = stats.sp;
                if (stats.level >= 4) protection = protection * 1.3;
                protection = protection * 0.25;
                return Math.round(protection);
            },
        }
    }

}
skills.luniare = { autoAttack };
// ===== End of Skills=====

// stats:{tier, atk, sp, aspd, p1, m3, c1p3}
export const table = {
    levelM: [1, 1.2, 1.4, 1.9, 2.1, 2.3, 2.5, 3, 3.2, 3.4, 3.6, 3.8, 4, 4.2, 4.4, 4.7, 5, 5.3, 5.6, 5.9],
    skills: skills,
    lv1BaseSp: {
        luniare: 15,
        rossette: 50,
        hela: 18,
        mel: 50,
        zuoyun: 10,
        ren: 20,
        priya: 65,
        shelda: 40,
        evan: 20,
        draco: 8,
        neria: 15,
        zupitere: 9,
        kanak: 50,
        alberon: 40,
        rie: 35,
    },
    lv1BaseAtk: {
        luniare: 15,
        rossette: 20,
        hela: 0,
        mel: 30,
        zuoyun: 20,
        ren: 20,
        priya: 15,
        shelda: 15,
        evan: 25,
        draco: 20,
        neria: 17,
        zupitere: 9,
        kanak: 10,
        alberon: 10,
        rie: 15,
    },
    lv1BaseSpd: {
        luniare: 1,
        rossette: 0.67,
        hela: 0,
        mel: 0.834,
        zuoyun: 1.25,
        ren: 1,
        priya: 1,
        shelda: 0.91,
        evan: 1.25,
        draco: 1,
        neria: 1.25,
        zupitere: 1,
        kanak: 1.25,
        alberon: 1,
        rie: 1,
    },
    carries: [
        { name: 'Mel', code: 'mel' },
        { name: 'Zuo Yun', code: 'zuoyun' },
        { name: 'Rose', code: 'rossette' },
        { name: 'Hela', code: 'hela' },
        { name: 'Evan', code: 'evan' },
        { name: 'Ren', code: 'ren' },
        { name: 'Priya', code: 'priya' },
        { name: 'Shelda', code: 'shelda' },
        { name: 'Draco', code: 'draco' },
        { name: 'Neria', code: 'neria' },
        { name: 'Zupitere', code: 'zupitere' },
        { name: 'Kanak', code: 'kanak' },
        { name: 'Rie', code: 'rie' },
        { name: 'Alberon', code: 'alberon' },
        { name: 'Luniare', code: 'luniare' },
    ],
    tierM: {
        luniare: [1, 1.606741573, 2.606741573, 3.606741573, 4.808988764, 6, 7],
        normal: [1, 1.60, 2.60, 3.60, 4.80, 6.00, 7.00],

    },
    skillModifier: {
        luninare: [1, 1, 1.15, 1.15, 1.3, 1.3, 1.5],
        rossette: [3, 3, 3, 3, 3, 3, 3],
        hela: [2.158, 2.158, 2.158, 2.158, 2.158, 2.158, 2.158],
    }
}
export const utils = {
    affix: (p1, m3) => {
        if (!p1) p1 = 0;
        if (!m3) m3 = 0;
        return (p1 * 0.7 + 1) * (m3 * 0.4 + 1)
    },
    /** The base sp for the given hero at level 1, tier 1. */
    lv1BaseSp: (hero) => {
        return table.lv1BaseSp[hero];
    },
    lv1BaseAtk: (hero) => {
        return table.lv1BaseAtk[hero];
    },
    /** The base sp for the given hero at tier 1 with the given level */
    baseSp: (name, level) => {
        var baseSp = table.lv1BaseSp[name];
        return baseSp * table.levelM[level - 1];

    },
    /** The base sp for the given hero at tier 1 with the given level */
    baseAtk: (name, level) => {
        var baseAtk = table.lv1BaseAtk[name];
        var levelM = table.levelM[level - 1];
        console.log("baseAtk:" + JSON.stringify({ name, level, baseAtk, levelM }))
        return Math.round(baseAtk * levelM);

    },
    baseAspd: (name, tier) => {
        if (tier == 0) {
            return table.lv1BaseSpd[name];
        }
        return round(utils.baseAspd(tier - 1)) + Math.round(table.lv1BaseSpd[name] * 0.1);
    },

    /** The sp will show on the field without luni buff. */
    heroSp: (name, level, tier, relic, staff, voidStack) => {
        var baseSp = utils.baseSp(name, level);
        var tierM = utils.tierModifier(name, tier);
        var result = Math.round(baseSp * tierM * (1 + staff / 100 + relic / 100 + voidStack * 0.4));
        console.log("heroSp:" + JSON.stringify({ name, baseSp, tierM, level, tier, relic, staff, voidStack, result }));
        return result;
    },

    /** The atk will show on the field without luni buff. */
    heroAtk: (name, level, tier, relic, sword, voidStack) => {
        var baseAtk = utils.baseAtk(name, level);
        var tierM = utils.tierModifier(name, tier);
        console.log("heroAtk" + JSON.stringify({ name, baseAtk, tierM, level, tier, relic, sword, voidStack }))
        return Math.round((baseAtk * (1 + voidStack * 0.4)) * tierM + sword + relic);
    },
    heroSpd: (name, level, tier, relic, bow) => {
        var lv1BaseSpd = table.lv1BaseSpd[name];
        var heroAspd = lv1BaseSpd * (1 + relic / 100 + bow / 100) + lv1BaseSpd * (tier - 1) * 0.1;
        // console.log(">>" + JSON.stringify([name, level, tier, relic, bow]) + "lv1BaseSpd:" + lv1BaseSpd)
        return heroAspd;
    },
    skillModifier: (hero, tier) => {
        return table.skillModifier[hero][tier - 1];
    },
    tierModifier: (hero, tier) => {
        // console.log(hero + " - " + tier);
        var tierMH = table.tierM[hero];
        if (!tierMH) {
            tierMH = table.tierM.normal;
        }
        return tierMH[tier - 1];
    },
    luniBuffSkillModifier: (tier) => {
        return table.skillModifier.luninare[tier];
    },
    luniBuffSpRatio: (hero) => {
        return table.lv1BaseSp[hero] / table.lv1BaseSp.luniare;
    },
    luniBuffAtkRatio: (hero) => {
        return table.lv1BaseAtk[hero] / table.lv1BaseAtk.luniare;
    },
    luniSp: (level, relicSp, luni, voidStack) => {
        return utils.heroSp('luniare', level, luni.tier, relicSp, luni.staff, voidStack);
    },
    luniAtk: (level, relicAtk, luni, voidStack) => {
        return utils.heroAtk('luniare', level, luni.tier, relicAtk, luni.sword, voidStack);
    },
    effectiveLuniSp: (level, relicSp, luniList, voidStack) => { // the sp that wiil be calculated to buff another hero.

        // console.log("luniList:::" + JSON.stringify(luniList))
        //luniList.sort((a, b) => utils.luniSp(luniBasic, b) - utils.luniSp(luniBasic, a));
        var db = luniList[0].db ? 2 : 1;
        var sum = utils.luniSp(level, relicSp, luniList[0], voidStack) * utils.luniBuffSkillModifier(luniList[0].tier - 1) * db;
        for (var i = 1; i < luniList.length; i++) {
            db = luniList[i].db ? 2 : 1;
            sum += utils.luniSp(level, relicSp, luniList[i], voidStack) * utils.luniBuffSkillModifier(luniList[i].tier - 1) / 2 * db;
        }
        return Math.round(sum);
    },
    effectiveLuniAtk: (level, relicAtk, luniList, voidStack) => { // the sp that wiil be calculated to buff another hero.
        // console.log("luniList:::" + JSON.stringify(luniList))
        //luniList.sort((a, b) => utils.luniSp(luniBasic, b) - utils.luniSp(luniBasic, a));
        var db = luniList[0].db ? 2 : 1;
        var sum = utils.luniAtk(level, relicAtk, luniList[0], voidStack) * utils.luniBuffSkillModifier(luniList[0].tier - 1) * db;
        for (var i = 1; i < luniList.length; i++) {
            db = luniList[i].db ? 2 : 1;
            sum += utils.luniAtk(level, relicAtk, luniList[i], voidStack) * utils.luniBuffSkillModifier(luniList[i].tier - 1) / 2 * db;
        }
        return Math.round(sum);
    },

    buffedByLuniSp(hero, heroSp, effectiveLuniSp) {
        //var effectiveLuniSp = utils.effectiveLuniSp(luniLevel, luniRelicSp, luniList)
        var lv1BaseSpRatio = utils.luniBuffSpRatio(hero);
        var result = Math.round(effectiveLuniSp * lv1BaseSpRatio + heroSp);
        console.log("buffedByLuniSp:" + JSON.stringify({ hero, heroSp, effectiveLuniSp, lv1BaseSpRatio, result }))
        return result;
    },
    buffedByLuniAtk(hero, heroAtk, effectiveLuniAtk) {
        //var effectiveLuniAtk = utils.effectiveLuniAtk(luniLevel, luniRelicAtk, luniList)
        var lv1BaseAtkRatio = utils.luniBuffAtkRatio(hero);
        var result = Math.round(effectiveLuniAtk * lv1BaseAtkRatio + heroAtk);
        console.log("buffedByLuniAtk:" + JSON.stringify({ hero, heroAtk, effectiveLuniAtk, lv1BaseAtkRatio, result }))
        return result;
    },
    heathTransfer(bossHp, w1Hp, w2Hp) {
        // K is the HP deducted from the warrior with the higest HP
        // 3/K is used to heal the rest of the 3 warriors.
        var K = 3.0 / 4.0 * (w1Hp - w2Hp);
        var w1Damage = Math.round(1.1 * K); // Modifier for real damage to the higest warrior is 1.1
        var w2Damage = Math.round(K);
        var heal = Math.round(K / 3 / 1.1);
        var w2DamageReal = Math.round(w2Damage - heal);
        var damage = 0;
        if (w2Hp < w2DamageReal) {
            damage = Math.round(w1Damage / 4);
        } else {
            damage = Math.round((w1Damage + (w2Damage - heal) * 3) / 4);
        }


        var result = {
            bossHp: bossHp,
            w1Hp: w1Hp,
            w2Hp: w2Hp,
            damage: damage,
            w1Damage: w1Damage,
            w2Damage: w2Damage,
            w2Heal: heal,
            w1Remain: w1Hp - w1Damage,
            w2Remain: w2Hp - w2Damage + heal,
            remain: bossHp - damage,
            unknown: w2Hp < w2DamageReal,
        }
        // console.log("result:" + JSON.stringify(result));
        return result;
    }
}
