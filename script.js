//Gets Elements by Id
function _(elm) {
    return document.getElementById(elm);
}
//Gets Elements by QuerySelectorAll
function el(elm) {
    return document.querySelectorAll(elm);
}

//-------------NAVBAR TOGGLE----------------------------
const navMenu = document.querySelector('.nav-menu');
const humberger = document.querySelector('.humberger');
humberger.addEventListener('click', (e) => {
    navMenu.classList.toggle('show-menu');
    e.target.classList.toggle('show-humberger');
});

//-------------SELECT ALL DOM ELEMENTS----------------------------
const [nextBtns, prevBtns, slides] = [el('.next'), el('.back'), el('.weight-slider')];
const [grades, aGrades1, aGrades2, aGrades3, subGrade, gp] = [el('.o-grade'), el('.a-grade1'), el('.a-grade2'), el('.a-grade3'), el('.sub-grade'), el('.gp')];
const [olevelSubjects, aRelevantSubj1, aRelevantSubj2, essential, sub] = [el('.olevel'), el('.a-relevant1'), el('.a-relevant2'), el('.essential'), el('.sub')];
const [list2, list3, list4, list5, list6, list7, list8, list9, list10, list11] = [_('list2'), _('list3'), _('list4'), _('list5'), _('list6'), _('list7'), _('list8'), _('list9'), _('list10'), _('list11')];
const [progress1, progress2, progress3, progress4, progress5, progress6, progress7, progress8, progress9, progress10] = [_('progress1'), _('progress2'), _('progress3'), _('progress4'), _('progress5'), _('progress6'), _('progress7'), _('progress8'), _('progress9'), _('progress10')];
const [distinc, credit, passes, failure] = [_('dist'), _('cred'), _('pass'), _('fail')];
const [leftProgress1, rightProgress1, leftProgress2, rightProgress2, leftProgress3, rightProgress3, leftProgress4, rightProgress4] = [_('leftProgress1'),  _('rightProgress1'), _('leftProgress2'), _('rightProgress2'), _('leftProgress3'), _('rightProgress3'), _('leftProgress4'), _('rightProgress4')];
const olevelTotal = _('total');
const creditContainer = _('credit');
const passContainer = _('pass');
const failContainer = _('fail');
const genderBtns = el('.gender-btn');
const overallWeights = _('totalWeights');
const prevBtn12 = _('back');
const firstBtn = _('firstBtn');
const finishBtn = _('finishBtn');



//Forward slides when clicked
nextBtns.forEach(nextBtn => {
    nextBtn.addEventListener('click', forwardSlide);
});

//Rewind slides when clicked
prevBtns.forEach(prevBtn => {
    prevBtn.addEventListener('click', rewindSlide);
});

//Moves slide forward
function forwardSlide(e) {
    let clicked = e.target;
    let slide = clicked.parentNode.parentNode;
    let next = slide.nextElementSibling;
    slide.style.left = '-400px';
    next.style.left = '0px';
}
//Moves slide backwards
function rewindSlide(e) {
    let clicked = e.target;
    let slide = clicked.parentNode.parentNode;
    let previous = slide.previousElementSibling;
    console.log(previous.id);
    slide.style.left = '400px';
    previous.style.left = '0px';
}


//--------------------------------CALCULATE OLEVEL WEIGHTS-----------------------------
firstBtn.addEventListener('click', calculateOlevelWeight)

function calculateOlevelWeight() {
    var selected = [];

    grades.forEach(grade => {
        if (grade.selected) {
            selected.push(grade.value);
        }
    });
    compute(selected);

    function compute(selected) {
        let t = [];
        var dist = [];
        var cred = [];
        var pass = [];
        var fail = [];
        selected.forEach(grade => {
            if (grade === "D1" || grade === "D2") {
                t.push(0.3);
                dist.push(grade);
            } else if (grade === "C3" || grade === "C4" || grade === "C5" || grade === "C6") {
                t.push(0.2);
                cred.push(grade);
            } else if (grade === "P7" || grade === "P8") {
                t.push(0.1);
                pass.push(grade);
            } else {
                t.push(0);
                fail.push(grade);
            }
        });
        let totalPoints = t.reduce((total, point) => total + point, 0);
        totalOlevelPoints = Number(totalPoints).toFixed(1);
        olevelTotal.innerText = totalOlevelPoints;
        calculateProgress(dist, cred, pass, fail);
        calcualtePercentage(totalOlevelPoints);
    }
    return totalOlevelPoints;
}


//CALCULATE PERCENTAGES  FOR OLEVEL PROGRESSBARS;
function calculateProgress(dist, cred, pass, fail) {
    progress1Percentage = (dist.length) * 10;
    progress2Percentage = (cred.length) * 10;
    progress3Percentage = (pass.length) * 10;
    progress4Percentage = (fail.length) * 10;

    progress1.style.width = `${progress1Percentage}%`;
    progress2.style.width = `${progress2Percentage}%`;
    progress3.style.width = `${progress3Percentage}%`;
    progress4.style.width = `${progress4Percentage}%`;

    distinc.innerHTML = `${dist.length}*0.3`;
    credit.innerHTML = `${cred.length}*0.2`;
    passes.innerHTML = `${pass.length}*0.1`;
    failure.innerHTML = `${fail.length}*0.0`;

}

// CALCULATE PERCENTAGE FOR CIRCULAR BAR  FOR OLEVEL WEIGHTS
function calcualtePercentage(totalOlevelPoints) {
    if (totalOlevelPoints > 1.5) {
        leftProgress1.style.transform = `rotate(180deg)`; 
        rightProgress1.style.transform = `rotate(${((totalOlevelPoints-1.5)/1.5)*180}deg)`;
    }else{
    leftProgress1.style.transform = `rotate(${(totalOlevelPoints/1.5)*180}deg)`; 
    rightProgress1.style.transform = `rotate(0deg)`;
    }

}

// ------------------------------------------------------------END OF OLEVEL--------------------------------------------------------------------------------------------------------



// ------------------------------------------------------------START OF ALEVEL--------------------------------------------------------------------------------------------------------
//PERFORM ALEVEL GRADE CALCULATIONS
function performClassToggle(list, classArray, class_name) {
    list.addEventListener("click", (e) => {
        if (e.target.classList.contains(class_name)) {
            let btn = e.target.parentNode.parentNode.nextElementSibling.lastElementChild;
            classArray.forEach(arr => {
                arr.classList.remove("select-g");
            });
            classArray.forEach(arr => {
                let clickedLi = e.target;
                clickedLi.classList.add('select-g');
                let active = document.querySelector('.select-g');
                if (active) {
                    var number = active.innerText;
                    if (number < 0) {
                        btn.classList.add('hide');
                    } else {
                        btn.classList.remove('hide');
                    }
                }
            });
            let scoredGradeArr = [];
            let alevelSubjects = [];
            let allGrades = el('.select-g');
            allGrades.forEach(allGrade => {
                if (allGrade.classList.contains('g')) {
                    let scoredGrade = allGrade.innerText;
                    scoredGradeArr.push(scoredGrade);
                } else if (allGrade.classList.contains('s')) {
                    alevelSubjects.push(allGrade.innerText);
                    // if ((alevelSubjects[0] === alevelSubjects[1]) || (alevelSubjects[0] === alevelSubjects[2])) {
                    //     alert('Cant have similar subjects');
                    //     btn.classList.add('hide');
                    // }
                    printAlevelSubjects(alevelSubjects);
                }

            });
            computeAlevelGrades(scoredGradeArr, allGrades);
        }
    });
}
performClassToggle(list3, aRelevantSubj1, 'a-relevant1');
performClassToggle(list4, aGrades1, 'a-grade1');
performClassToggle(list5, aRelevantSubj2, 'a-relevant2');
performClassToggle(list6, aGrades2, 'a-grade2');
performClassToggle(list7, essential, 'essential');
performClassToggle(list8, aGrades3, 'a-grade3');
performClassToggle(list9, sub, 'sub');
performClassToggle(list10, subGrade, 'sub-grade');
performClassToggle(list11, gp, 'gp');
//Compute AlevelGrades
function computeAlevelGrades(scoredGradeArr, allGrades) {
    tp = [];
    scoredGradeArr.forEach(scoredGrade => {
        let grade = scoredGrade;
        switch (grade) {
            case 'A':
                var points = 6;
                break;
            case 'B':
                var points = 5;
                break;
            case 'C':
                var points = 4;
                break;
            case 'D':
                var points = 3;
                break;
            case 'E':
                var points = 2;
                break;
            case 'O':
                var points = 1;
                break;
            default:
                var points = 0;
        }
        tp.push(points); //i.e [6,6,6,1,1]
        let totalPoints = tp.reduce((total, point) => total + point, 0);
        calcualtePercentagePoints(totalPoints);
        const totalPointsContainer = _('alevelTotalPoints');
        totalPointsContainer.innerHTML = `<h2 class="a-total-points">${totalPoints}<span>points</span></h2>`
        var [rel1Point, rel2Point, essePoint, SubPoint, GpPoint] = [tp[0], tp[1], tp[2], tp[3], tp[4]]
        let relevant1 = tp[0] * 3;
        let relevant2 = tp[1] * 3;
        let essential = tp[2] * 2;
        let Sub = tp[3] * 1;
        let Gp = tp[4] * 1;
        let = totalWeights = relevant1 + relevant2 + essential + Sub + Gp;
        calcualtePercentageWeights(totalWeights);
        const alevelTotalWeights = _('alevelTotalWeights');
        alevelTotalWeights.innerText = totalWeights;
        const [rel1, rel2, ess, subGp] = [_('rel1'), _('rel2'), _('ess'), _('subGp')];
        [rel1.innerHTML, rel2.innerHTML, ess.innerHTML, subGp.innerHTML] = [`<p>${tp[0]}*3</p>`, `<p>${tp[1]}*3</p>`, `<p>${tp[2]}*2</p>`, `<p>${tp[3]}+${tp[4]}</p>`];
        let gradesContainer = _('grades');
        gradesContainer.innerHTML = `<h4 class="gradeDiv">${scoredGradeArr[0]}${scoredGradeArr[1]}${scoredGradeArr[2]}${tp[3]}${tp[4]}</4>`
        getGender(totalWeights);
        overallWeights.innerText = totalWeights;
        progressASubjects(rel1Point, rel2Point, essePoint, SubPoint, GpPoint);
    });

} //End of function computeAlevelGrades;

// CALCULATE PERCENTAGE FOR CIRCULAR BAR  FOR TOTAL POINTS
function calcualtePercentagePoints(totalPoints) {
    if (totalPoints > 10) {
        leftProgress2.style.transform = `rotate(180deg)`; 
        rightProgress2.style.transform = `rotate(${((totalPoints-10)/10)*180}deg)`;
    }else{
    leftProgress2.style.transform = `rotate(${(totalPoints/10)*180}deg)`; 
    rightProgress2.style.transform = `rotate(0deg)`;
    }

}

// CALCULATE PERCENTAGE FOR CIRCULAR BAR  FOR ALEVEL WEIGHTS
function calcualtePercentageWeights(totalWeights) {
    if (totalWeights > 25) {
        leftProgress3.style.transform = `rotate(180deg)`; 
        rightProgress3.style.transform = `rotate(${((totalWeights-25)/25)*180}deg)`;
    }else{
    leftProgress3.style.transform = `rotate(${(totalWeights/25)*180}deg)`; 
    rightProgress3.style.transform = `rotate(0deg)`;
    }

}

//----PRINT ALEVEL SUBJECTS-----------------------------------------------
function printAlevelSubjects(alevelSubjects) {
    const [subj1, subj2, subj3, subj4] = [_('subj1'), _('subj2'), _('subj3'), _('subj4')]
    subj1.innerHTML = `${alevelSubjects[0]}`;
    subj2.innerHTML = `${alevelSubjects[1]}`;
    subj3.innerHTML = `${alevelSubjects[2]}`;
    subj4.innerHTML = `${alevelSubjects[3]} & GP`;
}

//-------CALCULATE WEIGHTS BASED ON GENDER----------------------------
function getGender(totalWeights) {
    const gender = _('gender');
    gender.addEventListener('click', (e) => {
        if (e.target.classList.contains('gender-btn')) {
            genderBtns.forEach(genderBtn => {
                let genderDiv = genderBtn.parentNode;
                genderDiv.classList.remove('select-gender');
                prevBtn12.addEventListener('click', () => {
                    genderDiv.classList.remove('select-gender');
                    finishBtn.classList.add('hide');
                });
            });
            genderBtns.forEach(genderBtn => {
                finishBtn.classList.remove('hide');
                let clickedGender = e.target.parentNode;
                clickedGender.classList.add('select-gender');
                var gender = e.target.innerText;
                let genderPoints = gender === "Female" ? 1.5 : 0;
                const alevelStatus = _('alevelStatus');
                gender === "Female" ? alevelStatus.innerHTML = `<p>${totalWeights}+1.5<br>(Female)</p>` : alevelStatus.innerHTML = `<p>${totalWeights}<br>(Male)</p>`;
                var overall = genderPoints + totalWeights + Number(calculateOlevelWeight());
                overallWeights.innerText = overall; //-----------------OVERALL WEIGHTS
                progressOverall(totalWeights);
                var totalOverallWeights = totalWeights + Number(calculateOlevelWeight());
                calcualtePercentageOverall(totalOverallWeights);
            });

        }
    });

}

// CALCULATE PERCENTAGE FOR CIRCULAR BAR  FOR OVERALL WEIGHTS
function calcualtePercentageOverall(totalOverallWeights) {
    if (totalOverallWeights > 26.5) {
        leftProgress4.style.transform = `rotate(180deg)`; 
        rightProgress4.style.transform = `rotate(${((totalOverallWeights - 26.5)/ 26.5)*180}deg)`;
    }else{
    leftProgress4.style.transform = `rotate(${(totalOverallWeights/ 26.5)*180}deg)`; 
    rightProgress4.style.transform = `rotate(0deg)`;
    }

}



//CALCULATE PERCENTAGES FOR ALEVEL PROGRESSBARS
function progressASubjects(rel1Point, rel2Point, essePoint, SubPoint, GpPoint) {
    progress5Percentage = (rel1Point / 6) * 100;
    progress6Percentage = (rel2Point / 6) * 100;
    progress7Percentage = (essePoint / 6) * 100;
    progress10Percentage = ((SubPoint + GpPoint) / 2) * 100;

    progress5.style.width = `${progress5Percentage}%`;
    progress6.style.width = `${progress6Percentage}%`;
    progress7.style.width = `${progress7Percentage}%`;
    progress10.style.width = `${progress10Percentage}%`;
}

//CALCULATE PERCENTAGES FOR OVERALL PROGRESSBARS
function progressOverall(totalWeights) {
    const olevelTotal = _('olevelTotal');
    olevelTotal.innerHTML = `${calculateOlevelWeight()}`
    progress8Percentage = (calculateOlevelWeight() / 3) * 100;
    progress9Percentage = (totalWeights / 50) * 100;

    progress8.style.width = `${progress8Percentage}%`;
    progress9.style.width = `${progress9Percentage}%`;
}

// -------------------------------------END OF ALEVEL---------------------------
