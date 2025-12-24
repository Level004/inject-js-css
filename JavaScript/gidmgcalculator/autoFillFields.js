function simulatePaste(member, customText) {
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value'
    ).set;

    nativeInputValueSetter.call(member, customText);

    const inputEvent = new Event('input', { bubbles: true });
    member.dispatchEvent(inputEvent);
}

function clickAllBuffCheckboxes(member) {
    member.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.click());
}

function uncheckSingleCheckbox(member, checkboxName) {
    member.querySelector(`div[aria-label="${checkboxName}"] input[type="checkbox"]`).click();
}

function clickAllDebuffCheckboxes(memberName) {
    const debuffSelector = document.querySelectorAll('div[title="Teammates debuffs"] + div div.peer.pt-2.space-y-3 > div');
    for (const debuff of debuffSelector) {
        if (debuff.querySelector('p').textContent === memberName) {
            debuff.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.click());
        }
    }
}

function setBuffField(member, labelName, value) {
    const selector = `div[aria-label="${labelName}"] > input`;
    const input = member.querySelector(selector);

    if (input) {
        simulatePaste(input, value);
    }
}

function setDebuffField(memberName, labelName, value) {
    const debuffSelector = document.querySelectorAll('div[title="Teammates debuffs"] + div div.peer.pt-2.space-y-3 > div');
    for (const debuff of debuffSelector) {
        if (debuff.querySelector('p').textContent === memberName) {
            const selector = `div[aria-label="${labelName}"] > input`;
            const input = debuff.querySelector(selector);

            if (input) {
                simulatePaste(input, value);
            }
        }
    }
}

function fillFields() {
    const partyMembers = document.querySelectorAll('div.mt-4:nth-child(2) > div:nth-child(1) > div:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div > div');

    document.querySelectorAll('div[title="Artifacts buffs"] + div input[type="checkbox"]').forEach(cb => cb.click());

    document.querySelectorAll('div[title="Weapons buffs"] + div input[type="checkbox"]').forEach(cb => cb.click());

    for (const member of partyMembers) {
        const memberName = member.querySelector('p').textContent;

        switch (memberName) {
            case "Bennett":
                setBuffField(member, "Base ATK", "865");
                setBuffField(member, "Elemental Burst Level", "13");
                clickAllBuffCheckboxes(member);
                break;
            case "Furina":
                setBuffField(member, "Fanfare (max 300)", "300");
                setBuffField(member, "Elemental Burst level", "10");
                clickAllBuffCheckboxes(member);
                break;
            case "Mika":
                setBuffField(member, "Elemental Skill Level", "13");
                clickAllBuffCheckboxes(member);
                break;
            case "Citlali":
                setBuffField(member, "Elemental Mastery", "1022");
                clickAllBuffCheckboxes(member);
                clickAllDebuffCheckboxes(memberName);
                break;
            case "Xianyun":
                setBuffField(member, "Xianyun's ATK", "2879");
                clickAllBuffCheckboxes(member);
                uncheckSingleCheckbox(member, "Xianyun's C2");
                break;
            case "Iansan":
                setBuffField(member, "Nightsoul points", "53");
                setBuffField(member, "ATK", "3000");
                setBuffField(member, "Elemental Skill level", "13");
                clickAllBuffCheckboxes(member);
                break;
            case "Chevreuse":
                setBuffField(member, "Chevreuse's Max HP", "40000");
                clickAllBuffCheckboxes(member);
                clickAllDebuffCheckboxes(memberName);
                break;
            case "Ineffa":
                setBuffField(member, "Ineffa's ATK", "2975");
                clickAllBuffCheckboxes(member);
                uncheckSingleCheckbox(member, "C1");
                break;
            case "Escoffier":
                clickAllBuffCheckboxes(member);
                clickAllDebuffCheckboxes(memberName);
                break;
            case "Shenhe":
                setBuffField(member, "Current ATK", "3036");
                setBuffField(member, "Elemental Skill Level", "9");
                clickAllBuffCheckboxes(member);
                setDebuffField(memberName, "Elemental Burst Level", "10");
                clickAllDebuffCheckboxes(memberName);
                break;
            case "Xilonen":
                setDebuffField(memberName, "Elemental Skill Level", "10");
                clickAllDebuffCheckboxes(memberName);
                break;
            case "Mona":
                setBuffField(member, "Elemental Burst Level", "10");
                clickAllBuffCheckboxes(member);
                break;
            case "Fischl":
                clickAllBuffCheckboxes(member);
                break;
            case "Aino":
                clickAllBuffCheckboxes(member);
                break;
            case "Durin":
                setBuffField(member, "Durin's ATK", "2398");
                clickAllBuffCheckboxes(member);
                clickAllDebuffCheckboxes(memberName);
                break;
            default:
                console.log(`${memberName} is not on the list`);
        }
    }
}

