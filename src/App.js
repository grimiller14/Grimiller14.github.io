import React, { useState, useEffect } from "react";
import champs from "./data/champs";

const App = () => {

    const [trait1, setTrait1] = useState(null);
    const [trait2, setTrait2] = useState(null);
    const [kingUnit, setKingUnit] = useState(null);
  
    const ReturnTraitsOfChamp = (champ) => {
        let selected = [];
        Object.values(champs).forEach(element => {
            let found = element.find(item => item.name === champ);
            if (found !== undefined) {
                selected.push(found);
            }
        });
        return selected[0].traits;
    }
  
    const ReturnCostOfChamp = (champ) => {
        let selected = [];
        Object.values(champs).forEach(element => {
            let found = element.find(item => item.name === champ);
            if (found !== undefined) {
                selected.push(found);
            }
        });
        return selected[0].cost;
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
        let viableTraits = []
        allTraits.forEach(trait => {
            if (ReturnChampsWithTrait(trait).length !== 1) {
                viableTraits.push(trait);
            }
        });
        let randomNum = randomIntFromInterval(0, viableTraits.length - 1);
        return viableTraits[randomNum];
    }

    const SelectRandomSecondaryTrait = (excludedTrait) => {
        let allTraits = ReturnAllTraits();
        let viableTraits = []
        allTraits.forEach(trait => {
            if (ReturnChampsWithTrait(trait).length !== 1 || trait !== excludedTrait) {
                viableTraits.push(trait);
            }
        });
        let randomNum = randomIntFromInterval(0, viableTraits.length - 1);
        return viableTraits[randomNum];
    }

    const RollComps = () => {
        let randomTrait = SelectRandomTrait();
        setTrait1(randomTrait);
        let randomTrait2 = SelectRandomSecondaryTrait(trait1);
        setTrait2(randomTrait2);
        PickKingUnit(randomTrait, randomTrait2);
    }

    const PickKingUnit = (selectedTrait1, selectedTrait2) => {
        let allUnits = [];
        ReturnChampsWithTrait(selectedTrait1).forEach(champ => {
            if (allUnits.indexOf(champ) === -1) {
                allUnits.push(champ);
            }
        })
        ReturnChampsWithTrait(selectedTrait2).forEach(champ => {
            if (allUnits.indexOf(champ) === -1) {
                allUnits.push(champ);
            }
        })
        // USE THIS SECTION IF YOU WANT IT TO BE A 2 COST KING
        // -------------------------------------------------------------------------

        // let viableUnits = [];
        // allUnits.forEach(champ => {
        //     if (ReturnCostOfChamp(champ.name) === 2) {
        //         viableUnits.push(champ);
        //     }
        // })
        // setKingUnit(viableUnits[randomIntFromInterval(0, viableUnits.length - 1)]);

        // -------------------------------------------------------------------------
        // OTHERWISE USE THIS ONE
        // -------------------------------------------------------------------------

        setKingUnit(allUnits[randomIntFromInterval(0, allUnits.length - 1)]);
        
        // -------------------------------------------------------------------------
    }

    return (
        <div>
            <button onClick={() => {
                RollComps();
            }}>
                roll
            </button>

            {kingUnit !== null && kingUnit !== undefined ? 
                <div>
                    <strong>King Unit:</strong>
                    {kingUnit.name}
                </div>
            : <></>}

            {trait1 !== null ? 
                <div>
                    <strong>{trait1}</strong>
                    {ReturnChampsWithTrait(trait1).map((champ, index) => {
                        return (<div key={index}>{champ.name}</div>)
                    })}
                </div> 
            : <></>}

            {trait2 !== null ? 
                <div>
                    <strong>{trait2}</strong>
                    {ReturnChampsWithTrait(trait2).map((champ, index) => {
                        return (<div key={index}>{champ.name}</div>)
                    })}
                </div> 
            : <></>}

        </div>
    );
};

export default App;
