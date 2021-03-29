
$(document).ready(function(){

        
        $('#start,#num_questions,#difficulty,#category,#bg,h1,h2,p').hide();
        $('#next_question,#show_answer').hide();
        

        $('.bg-image').click(function(){
            $(".bg-image").hide()
            $('#start,#num_questions,#category,#difficulty,#bg,h1,h2,p').fadeIn();
        })
        
        function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            }
            return array;
        }
        function nextQuestion(count){
            count = count + 1;
            return count;
        }

         $('#start').click(function(){
            var number = $( '#num_questions' ).val();
            var category = $( "#category" ).val();
            var difficulty = $( "#difficulty" ).val();
            var url 
            if(number<=0){
            $( "p" ).text("Insert amount of questions!");
            }
            else{
                if(category=='all' && difficulty=='all'){
                    url = 'https://opentdb.com/api.php?amount='+number+'&type=multiple';
                }
                else if(category=='all' && difficulty!='all'){
                    url = 'https://opentdb.com/api.php?amount='+number+'&difficulty='+difficulty+'&type=multiple';
                }
                else{
                    if(category=='Geography'){
                        category = 22;
                    }
                    else if(category=='History'){
                        category = 23;
                    }
                    else if(category=='Sports'){
                        category = 21;
                    }
                    else if(category=='Art'){
                        category = 25;
                    }
                    else if(category=='Animals'){
                        category = 27;
                    }
                    else if(category=='Science & Nature'){
                        category = 17;
                    }
                    else if(category=='Math'){
                        category = 19;
                    }
                    else{
                        category = 20;
                    }

                    if(difficulty=='all'){
                        url = 'https://opentdb.com/api.php?amount='+number+'&category='+category+'&type=multiple';
                    }
                    else{
                        url = 'https://opentdb.com/api.php?amount='+number+'&category='+category+'&difficulty='+difficulty+'&type=multiple';
                    }
                }
            $.get(url , function(res) {
                console.log(res)  
                $('#start,#num_questions,#category,#difficulty,h1,h2,p').hide();
                $('#next_question').fadeIn();

                var htmlStr = '<h3>Question</h3>';
                var right_answer=[];
                var question=[];
                var answers=[];
                var current_question=0;
                
                $('#next_question').click(function(){
                    $('#show_answer').fadeIn();
                    htmlStr='';
                    question=res.results[current_question].question;
                    right_answer=res.results[current_question].correct_answer;
                    answers=res.results[current_question].incorrect_answers;
                    answers.push(res.results[current_question].correct_answer);
                    
                   shuffleArray(answers);
                   console.log(answers);
                   

                    htmlStr += '<h4>'+question+'</h4>';
                    for(var j=0;j<4;j++){
                    htmlStr += '<input class="form-check-input" type="radio"> <h3>'+answers[j]+'</h3>';
                    }
                    $('#show_answer').click(function(){
                        htmlStr='Answer is:'+right_answer+'';
                        $('#questions').html(htmlStr);
                    })
                   $('#questions').html(htmlStr);
                   if(current_question<res.results.length){
                    current_question=current_question+1;
                    if (current_question>res.results.length-1){
                        window.alert("Final questions!");
                    }
                   }
                  
                   
                   
                   })
                    
               console.log(current_question);
                


    
            })
            }
       
    })
    })