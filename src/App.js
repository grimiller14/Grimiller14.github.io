import React, { useState, useEffect } from "react";
import champs from "./data/champs";

const App = () => {

    const [trait1, setTrait1] = useState(null);
    const [trait2, setTrait2] = useState(null);
    const [kingUnit, setKingUnit] = useState(null);

    const [useFixedLevel, setUseFixedLevel] = useState(false);
    const [fixedLevel, setFixedLevel] = useState(2);

    useEffect(() => {
        let loaded = false;
        if (!loaded) {
            RollComps();
            loaded = true;
        }
        // eslint-disable-next-line
    }, [])
  
    const ReturnChampInfo = (champ) => {
        let selected = [];
        Object.values(champs).forEach(element => {
            let found = element.find(item => item.name === champ);
            if (found !== undefined) {
                selected.push(found);
            }
        });
        return selected[0];
    }

    const ReturnChampsWithTrait = (trait) => {
        let selected = [];
        Object.values(champs).forEach(element => {
            let found = element.filter(item => item.traits.indexOf(trait) > -1);
            found.forEach(champ => {
                if (found !== champ) {
                    selected.push(champ);
                }
            })
        });
        return selected;
    }
    
    const ReturnAllTraits = () => {
        let selected = [];
        Object.values(champs).forEach(element => {
            Object.values(element).forEach(champ => {
                champ.traits.forEach(trait => {
                    if (selected.indexOf(trait) > -1) {
                        // do nothing if in array 
                    } else {
                        selected.push(trait);
                    }
                })
            });
        });
        return selected;
    }

    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const SelectRandomTrait = () => {
        let allTraits = ReturnAllTraits();
        let viablePrimaryTraits = []
        allTraits.forEach(trait => {
            if (ReturnChampsWithTrait(trait).length !== 1) {
                viablePrimaryTraits.push(trait);
            }
        });
        let randomNum = randomIntFromInterval(0, viablePrimaryTraits.length - 1);
        return viablePrimaryTraits[randomNum];
    }

    const SelectRandomSecondaryTrait = (excludedTrait) => {
        let allTraits = ReturnAllTraits();
        let viableSecondaryTraits = [];
        allTraits.forEach(trait => {
            if (ReturnChampsWithTrait(trait).length !== 1 && trait !== excludedTrait) {
                viableSecondaryTraits.push(trait);
            }
        });
        viableSecondaryTraits.sort();
        let randomNum = randomIntFromInterval(0, viableSecondaryTraits.length - 1);
        return viableSecondaryTraits[randomNum];
    }

    const RollComps = () => {
        if (useFixedLevel) {
            let viableChamps = []
            ReturnAllTraits().forEach(trait => {
                ReturnChampsWithTrait(trait).forEach(champ => {
                    if (champ.cost === fixedLevel) {
                        viableChamps.push(champ);
                    }
                });
            });
            let selectedUnit = viableChamps[randomIntFromInterval(0, viableChamps.length - 1)]
            setKingUnit(selectedUnit);
            let primaryTrait = selectedUnit.traits[randomIntFromInterval(0, selectedUnit.traits.length - 1)]
            setTrait1(primaryTrait);
            let randomTrait2 = SelectRandomSecondaryTrait(primaryTrait);
            setTrait2(randomTrait2);
        } else {
            let randomTrait = SelectRandomTrait();
            setTrait1(randomTrait);
            let randomTrait2 = SelectRandomSecondaryTrait(randomTrait);
            setTrait2(randomTrait2);
            PickKingUnit(randomTrait, randomTrait2);
        }
    }

    const PickKingUnit = (selectedTrait1, selectedTrait2) => {
        let allUnits = [];
        ReturnChampsWithTrait(selectedTrait1).forEach(champ => {
            if (allUnits.indexOf(champ) === -1) {
                allUnits.push(champ);
            }
        });
        ReturnChampsWithTrait(selectedTrait2).forEach(champ => {
            if (allUnits.indexOf(champ) === -1) {
                allUnits.push(champ);
            }
        });

        if (useFixedLevel) {
            let viableUnits = [];
            allUnits.forEach(champ => {
                if (ReturnChampInfo(champ.name).cost === fixedLevel) {
                    viableUnits.push(champ);
                }
            })
            setKingUnit(viableUnits[randomIntFromInterval(0, viableUnits.length - 1)]);
        } else {
            setKingUnit(allUnits[randomIntFromInterval(0, allUnits.length - 1)]);
        }
    }

    return (
        <div className={"column-parent"}>

            <div className={"left-column"}>
                {kingUnit !== null && kingUnit !== undefined ? 
                    <div>
                        <h1 className={"king-champ-title"}>King Unit:</h1>
                        <h3 className={"king-champ-name"}>{kingUnit.name}</h3>
                        <div className={"king-container"}>
                            <div className={"image-container champ-cost-" + kingUnit.cost}>
                                <img title={kingUnit.name} className={"small-champ"} src={"https://ddragon.leagueoflegends.com/cdn/14.24.1/img/tft-champion/" + kingUnit.imgFull} alt={kingUnit.name} />
                            </div>
                        </div>
                    </div>
                : <></>}

                {trait1 !== null ? 
                    <div>
                        <h2>{trait1}</h2>
                        <div className={"primary-trait-container"}>
                        {ReturnChampsWithTrait(trait1).map((champ, index) => {
                            return (<div key={index} className={"image-container champ-cost-" + champ.cost}>
                                    <img title={champ.name} className={"small-champ"} src={"https://ddragon.leagueoflegends.com/cdn/14.24.1/img/tft-champion/" + champ.imgFull} alt={champ.name} />
                                </div>)
                        })}
                        </div>
                    </div> 
                : <></>}

                {trait2 !== null ? 
                    <div>
                        <h2>{trait2}</h2>
                        <div className={"secondary-trait-container"}>
                        {ReturnChampsWithTrait(trait2).map((champ, index) => {
                            return (<div key={index} className={"image-container champ-cost-" + champ.cost}>
                                    <img title={champ.name} className={"small-champ"} src={"https://ddragon.leagueoflegends.com/cdn/14.24.1/img/tft-champion/" + champ.imgFull} alt={champ.name} />
                                </div>)
                        })}
                        </div>
                    </div> 
                : <></>}

                <div className={"options-box"}>
                    <h1 className={"options-title"}>
                        Options
                    </h1>
                    <input type={"checkbox"}
                        defaultValue={useFixedLevel}
                        id={"setLevelOfKing"}
                        onChange={(e) => {
                            setUseFixedLevel(e.target.checked);
                    }}/>
                    <label for={"setLevelOfKing"} className={"no-highlight"}>Fixed Level of King?</label>
                    {useFixedLevel ? 
                        <input className={"level-input-box"} 
                            type={"number"}
                            min={1}
                            max={5}
                            defaultValue={fixedLevel}
                            onChange={(e) => {
                                setFixedLevel(parseInt(e.target.value));
                            }}
                        />
                    : <></> }
                </div>
            </div>

            <div className={"right-column"}>
                <button className={"roll-button"} onClick={() => {
                    RollComps();
                }}>
                    ROLL
                </button>

                <h1>Rules - King of the Arena</h1>
                <h2>1. No Turning Back</h2>
                <div>There is no return! Once you got your team, stick with it.</div>
                <h2>2. Never surrender</h2>
                <div>There is always hope!</div>
                <h2>3. Loyalty is key</h2>
                <div>You are only allowed to buy champions that belong to the origin/class you are assigned to!</div>
                <h2>4. Carousel is your Ace in sleeve!</h2>
                <div>You are allowed to take any champion you want in carousel, so you can expand your team buffs!</div>
                <h2>5. Play around your king</h2>
                <div>You have to always buy your king if it's possible and he must be on the field!</div>
                <h2>6. The king is rich</h2>
                <div>When you own your king, he has to have the most items!</div>
                <h2>7. Two kings</h2>
                <div>The champion with an augmentation is also a king and can be put on the field. One of the both kings must have the most items</div>

            </div>
        </div>
    );
};

export default App;
