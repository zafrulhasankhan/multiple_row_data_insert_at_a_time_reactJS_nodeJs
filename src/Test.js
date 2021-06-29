import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import axios from 'axios';

function Test() {


    useEffect(() => {
        document.getElementById('but').click();
    }, [])

    let search = (e) => {
        e.preventDefault();

        $.fn.serializeObject = function (data) {

            var els = $(this).find(':input').get();
            if (typeof data != 'object') {
                // return all data
                data = {};

                $.each(els, function () {
                    if (this.name && !this.disabled && (this.checked || /select|textarea/i.test(this.nodeName) || /text|hidden|password/i.test(this.type))) {
                        data[this.placeholder] = $(this).val();
                    }
                });
                return data;
            }
        };


        $(document).ready(function () {


            // // $('.addAnotherCar').click(function (e) {
            // //     e.preventDefault();
            // //     var count = 1;
            // //     count++;
            // //     $("<hr/><section className='carInfo'><input type='text' name='Make' className='make' /><input type='text' name='Model' className='model' /><input type='text' name='Year' className='year' /><input type='text' name='Color' className='color' /></section>").appendTo('.inputContainer').attr('className', 'carInfo' + count);
            // // });



            $("#car").on("submit", function (event) {
                var course_name = $('#cn').val();
                var class_num = $('#cnum').val();
                console.log("class name --" + course_name);
                console.log("class number -- "+ class_num);
                //$(this).children('input[type=submit]').prop('disabled',true);
                var data = [];
                $(this).find(".inputContainer section").each(function () {
                    data[data.length] = $(this).serializeObject();
                })
                var carDataString = JSON.stringify(data);
                // carDataString.each(function(obj,index){
                //     console.log(obj.Make);
                // })
                //let item = {att};

                axios.post('http://localhost:4000/create',{

                        attendance:carDataString,
                        course_name:course_name
                    }
                ).then((res)=>{
                  console.log(res);
                }).catch((err)=>{
                    console.log(err);
                })
                var parsejson = JSON.parse(carDataString);
                //setatt(carDataString);
                console.log(carDataString);
                //console.log(cname);
                // for(var i=0;i<parsejson.length;i++){
                //     console.log(parsejson[i].Make);
                // }
                //     att.map((data)=>{
                //        console.log(data);
                // })

                $("input[name='AllCarData']").val(carDataString);
                return false
            });

        })


    }



    return (
        <div>

            <fieldset>
                <legend>Multiple student data insert into db using React-js and node-js </legend>
                <input type="text" id="cn" className="make" placeholder="class name" />
                <input type="text" id="cnum" className="make" placeholder="class number" /><br/>

                <form id="car" onSubmit={search}><br/>
                    <section className="inputContainer">
                        {(() => {

                            let input = [];
                            for (let i = 0; i < 2; i++) {
                                input.push(
                                    <section className="carInfo">
                                        <input type="text" value={i + 1} name="Make" className="make" placeholder="Make" />
                                        <input type="text" value={i} name="Model" className="model" placeholder="Model" />
                                        <input type="text" value={i} name="Year" className="year" placeholder="Year" /><br></br>
                                        <span>Present</span> <input type="radio" value="present" name={i} className="color" placeholder="Present" /><br />
                                        <span>Absent</span><input type="radio" value="absent" name={i} className="color" placeholder="Absent" /><br/><br/>
                                    </section>
                                );
                            }

                            return input;
                        })()}
                    </section>

                    <input type="submit" id="but" className="btn btn-default" value="Submit" />
                </form>


            </fieldset>

            <br /> <fieldset>
                <legend>
                    hello this is legend work check
                </legend>
            </fieldset>
        </div>
    );
};

export default Test;