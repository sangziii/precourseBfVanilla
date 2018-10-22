function rand(m, n){
    return m + Math.floor((n-m+1) * Math.random());
}

function randFace(){
    return ["crown", "anchor", "heart", "spade", "club", "diamond"][rand(0,5)];
}

let funds = 50;
let round = 0;

while(funds > 1 && funds < 100){
    rount++;
    console.log(`round : ${round}`);
    console.log(`\tstarting funds : ${funds}p`);
    // 돈을 건다
    const bets = { crown: 0, anchor: 0, heart: 0, spade: 0, club: 0, diamond: 0 };
    const totalBet = rand(1, funds);
    
    if (funds === 7){
        totalBet = funds;
        bets.heart = totalBet;
    } else {
        // 돈을 배분한다
        let remaining = totalBet;
        do {
            let bet = rand(1, remaining);
            let face = randFace();
            bets[face] = bets[face] + bet;
            remaining = remaining - bet;
        } while (remaining > 0);        
    }
    funds = funds - totalBet;
    console.log('\tbets : ' + 
        Object.keys(bets).map(face => `${face} : ${bets[face]} pence`).join(', ') + `(total: ${totalBet} pence)`);

    // 주사위를 굴린다
    const hand = [];
    for(let roll=0; roll<3; roll++){
        hand.push(randFace());
    }
    console.log(`\thand: ${hand.join(', ')}`);

    // 그림을 맞추면 돈을 가져온다
    let winnings = 0;
    for(let die=0; die<hand.length; die++){
        let face = hand[die];
        if(bets[face] > 0){
            winnings = winnings + bets[face];
        }
        funds = funds + winnings;
        console.log(`\twinnings : ${winnings}`);
    }
    console.log(`\tending funds : ${funds}`);
}

