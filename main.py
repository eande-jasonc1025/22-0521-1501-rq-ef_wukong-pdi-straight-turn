"""

Ultrasonic Sensor: 2

* Red board seems best, reliable and real-time < 50cm,  just 100's rarely

** Need 5v

* RCWL-1601 Green Board

** Seems very reliable

"""
"""

Ultrasonic Sensor: 1

* Red-Wire 3-5v

** TYJ does work but within 35cm and it adds 10cm (measures 10cm extra) too much, yet seems consistent.  Also power should come from its 5v and not 3.3v (not work) : ).

* HC-SR04P much more reliable even up to 70-80cm, and more accurate under 30cm not adding 10cm, yet more like 5 or so, seems as reliable as a LEGO EV3.  Also 'Show console Device' very nice to display LED values.  : )

* HC-SR04 w/ metal-bin on top: also very reliable up to 60cm, appears to be less accurate <= 60, flips to 4 when  > 30

* Tried Trig=P0, Echo=P1 not work

* Best Trig=P8 Digital Out, Echo=P0 Analog In= 50cm or less

"""
"""

* LIght Sensor #2:

* IR Sensor: MH-Sensor Series: TYJ D0 works yet need 5v, works w/ pin 13 :)+

** Seems better facing down, since easier to control height, less room for builder's error to be off +/- 0.1cm

** Digital Read :)+

"""
"""

let sensor_Photo_Reflection_NoDetect_L_Bool = false

"""
"""

let sensor_Photo_Reflection_NoDetect_R_Bool = false

"""
"""

let motor_Type_Geekservo_0pt5KgCm_Servo_360DegMax_On_Bool = false

"""
"""

let sensor_Sonar_Echo_YesDetect_RANGE_MAX_CM_INT = 0

"""
"""

* 2022-0702-1150 TYJ K-value: 1.0, 0.8, 0.6, 0.4 seems best , yet also involved 0.5* so 0.4 * 0.5 = 0.2 : )  can try less later, place signal of where AI is working

** Thus 1 * 0.5 = 0.5 :(+

** 0.8 * 0.5 = 0.4 :(+

** 0.6 * 0.5 = 0.3 :(+

** 0.4 * 0.5 = 0.2 :)+

** 0.2 too weak, maybe try 0.5

* 2022-0702-1500 TYJ K-proportional = 0.2, 0.1 too weak to turn-right, yet turn-left is very weak, 0.3 not bad but not as smooth as 0.2

* add K-integral and K-derivative

"""
"""

let sensor_Sonar_Echo_YesDetect_Distance_Cm_Int = 0

"""
def do_Detect_Mode_Func():
    global _system_StringVariable_AsComment, motor_Power_Right_Int, motor_Power_Left_Int, sensor_Compass_Direction__Detect_Delta_Now__DegreesToPower__K_Proportional_Fix__Int, sensor_Compass_Direction__Detect_Delta_Summation_Old__Int, sensor_Compass_Direction__Detect_Delta_Summation_Now__Int, sensor_Compass_Direction__Detect_Delta_Summation__DegreesToPower__K_Integral_Fix__Int, sensor_Compass_Direction__Detect_Delta_Change__Int, sensor_Compass_Direction__Detect_Delta_Change__DegreesToPower__K_Derivative_Fix__Int, sensor_Compass_Direction__Detect_Delta_Old__Degrees__Int, sensor_Compass_Direction__Detect_Delta__DegreesToPower__K_Total_Fix__Int
    if True:
        _system_StringVariable_AsComment = "Good start, but defaults to stop, need to move forward yet room for =/-, what if delta=0 then move straight still"
        motor_Power_Right_Int = motor_Power_STOP_INT - motor_Power_Forward__OffsetFromIdle_AsBase_Int
        motor_Power_Left_Int = motor_Power_STOP_INT + motor_Power_Forward__OffsetFromIdle_AsBase_Int
        if True:
            _system_StringVariable_AsComment = "DEBUG TODO: ###"
            OLED12864_I2C.show_string(0,
                1,
                "" + convert_to_text(sensor_Compass_Direction__Detect_Delta_Now__DegreesToPower__K_Proportional_MagicFactor__Int) + " " + convert_to_text(sensor_Compass_Direction__Detect_Delta_Summation__DegreesToPower__K_Integral_MagicFactor__Int) + " " + convert_to_text(sensor_Compass_Direction__Detect_Delta_Change__DegreesToPower__K_Derivative_MagicFactor__Int),
                1)
    if not (mode_Force_Straight_WithOutGyroscope_Bool):
        if True:
            _system_StringVariable_AsComment = "K-Proportional Fix"
            sensor_Compass_Direction__Detect_Delta_Now__DegreesToPower__K_Proportional_Fix__Int = sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int * sensor_Compass_Direction__Detect_Delta_Now__DegreesToPower__K_Proportional_MagicFactor__Int
            if True:
                _system_StringVariable_AsComment = "DEBUG TODO: ###-#"
        if True:
            _system_StringVariable_AsComment = "K-Integral Fix"
            sensor_Compass_Direction__Detect_Delta_Summation_Old__Int = sensor_Compass_Direction__Detect_Delta_Summation_Now__Int
            sensor_Compass_Direction__Detect_Delta_Summation_Now__Int = sensor_Compass_Direction__Detect_Delta_Summation_Now__Int + sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int
            sensor_Compass_Direction__Detect_Delta_Summation__DegreesToPower__K_Integral_Fix__Int = sensor_Compass_Direction__Detect_Delta_Summation_Now__Int * sensor_Compass_Direction__Detect_Delta_Summation__DegreesToPower__K_Integral_MagicFactor__Int
            if True:
                _system_StringVariable_AsComment = "DEBUG TODO: ###-##"
        if True:
            _system_StringVariable_AsComment = "K-Derivative Fix"
            sensor_Compass_Direction__Detect_Delta_Change__Int = sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int - sensor_Compass_Direction__Detect_Delta_Old__Degrees__Int
            sensor_Compass_Direction__Detect_Delta_Change__DegreesToPower__K_Derivative_Fix__Int = sensor_Compass_Direction__Detect_Delta_Change__Int * sensor_Compass_Direction__Detect_Delta_Change__DegreesToPower__K_Derivative_MagicFactor__Int
            if True:
                _system_StringVariable_AsComment = "DEBUG TODO: ###-###"
            sensor_Compass_Direction__Detect_Delta_Old__Degrees__Int = sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int
        if True:
            _system_StringVariable_AsComment = "K-Proportional + K-Integral + K-Derivative Fixes"
            sensor_Compass_Direction__Detect_Delta__DegreesToPower__K_Total_Fix__Int = sensor_Compass_Direction__Detect_Delta_Now__DegreesToPower__K_Proportional_Fix__Int + (sensor_Compass_Direction__Detect_Delta_Summation__DegreesToPower__K_Integral_Fix__Int + sensor_Compass_Direction__Detect_Delta_Change__DegreesToPower__K_Derivative_Fix__Int)
            motor_Power_Right_Int = motor_Power_Right_Int + sensor_Compass_Direction__Detect_Delta__DegreesToPower__K_Total_Fix__Int
            motor_Power_Left_Int = motor_Power_Left_Int + sensor_Compass_Direction__Detect_Delta__DegreesToPower__K_Total_Fix__Int
            _system_StringVariable_AsComment = "could use 5, but try 25"
            do_GraphNumber_Func(sensor_Compass_Direction__Detect_Delta__DegreesToPower__K_Total_Fix__Int,
                25)
            if True:
                _system_StringVariable_AsComment = "DEBUG TODO: ###-###-#"
                OLED12864_I2C.show_string(0,
                    2,
                    "" + do_NumberPadder_AsStringOut_Func(sensor_Compass_Direction__Detect_Delta_Now__DegreesToPower__K_Proportional_Fix__Int,
                        3) + " " + do_NumberPadder_AsStringOut_Func(sensor_Compass_Direction__Detect_Delta_Summation__DegreesToPower__K_Integral_Fix__Int,
                        4) + " " + do_NumberPadder_AsStringOut_Func(sensor_Compass_Direction__Detect_Delta_Change__DegreesToPower__K_Derivative_Fix__Int,
                        0),
                    1)
                OLED12864_I2C.show_string(0,
                    3,
                    "" + do_NumberPadder_AsStringOut_Func(motor_Power_Left_Int, 3) + " " + do_NumberPadder_AsStringOut_Func(motor_Power_Right_Int, 3) + " " + do_NumberPadder_AsStringOut_Func(sensor_Compass_Direction__Detect_Delta__DegreesToPower__K_Total_Fix__Int,
                        4),
                    1)
    if True:
        do_Motor_Run_Func(motor_Power_Right_Int, motor_Power_Left_Int)
        music.play_tone(784, music.beat(BeatFraction.QUARTER))

def on_button_pressed_a():
    global mode_Force_Straight_WithGyroscope_Bool, mode_Force_Straight_WithOutGyroscope_Bool
    if True:
        mode_Force_Straight_WithGyroscope_Bool = True
        mode_Force_Straight_WithOutGyroscope_Bool = False
        basic.show_icon(IconNames.DIAMOND)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_gesture_logo_up():
    global sensor_Compass_Direction__Detect_Delta_Summation__DegreesToPower__K_Integral_MagicFactor__Int, _system_StringVariable_AsComment
    if True:
        sensor_Compass_Direction__Detect_Delta_Summation__DegreesToPower__K_Integral_MagicFactor__Int = sensor_Compass_Direction__Detect_Delta_Summation__DegreesToPower__K_Integral_MagicFactor__Int + 0.01
        _system_StringVariable_AsComment = "DEBUG TODO"
input.on_gesture(Gesture.LOGO_UP, on_gesture_logo_up)

def on_gesture_tilt_left():
    global sensor_Compass_Direction__Detect_Delta_Now__DegreesToPower__K_Proportional_MagicFactor__Int, _system_StringVariable_AsComment
    if True:
        sensor_Compass_Direction__Detect_Delta_Now__DegreesToPower__K_Proportional_MagicFactor__Int = sensor_Compass_Direction__Detect_Delta_Now__DegreesToPower__K_Proportional_MagicFactor__Int + 0.1
        _system_StringVariable_AsComment = "DEBUG TODO"
input.on_gesture(Gesture.TILT_LEFT, on_gesture_tilt_left)

def do_NumberPadder_AsStringOut_Func(number_in: number, string_len_max_in: number):
    global _system_StringVariable_AsComment, _local_string_out
    _system_StringVariable_AsComment = "Round to remove decimal"
    _local_string_out = convert_to_text(Math.round(number_in))
    for index in range(string_len_max_in - len(convert_to_text(Math.round(number_in)))):
        _local_string_out = " " + _local_string_out
    return _local_string_out

def on_gesture_screen_down():
    input.calibrate_compass()
input.on_gesture(Gesture.SCREEN_DOWN, on_gesture_screen_down)

def on_button_pressed_ab():
    global mode_State_Pause_Bool, mode_Force_Straight_WithGyroscope_Bool, mode_Force_Straight_WithOutGyroscope_Bool
    mode_State_Pause_Bool = not (mode_State_Pause_Bool)
    if True:
        mode_Force_Straight_WithGyroscope_Bool = False
        mode_Force_Straight_WithOutGyroscope_Bool = False
        basic.show_icon(IconNames.SQUARE)
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def do_GraphNumber_Func(number_to_graph_in: number, number_to_graph__absolute_max_in: number):
    global _system_StringVariable_AsComment, _local_graph_number__leds_needed__base1__int, _local_graph_number__leds_counter_index__base0__int, _local_graph_number__leds_counter_index__iteration_step__int
    _system_StringVariable_AsComment = "Starting at either {0,0) or (4,4), have 25 leds for graphing"
    _local_graph_number__leds_needed__base1__int = abs(Math.idiv(number_to_graph_in, number_to_graph__absolute_max_in / 25))
    basic.clear_screen()
    _local_graph_number__leds_counter_index__base0__int = 0
    if number_to_graph_in >= 0:
        _system_StringVariable_AsComment = "Bot needs to go clock-wise, so start at (4,4: led #24[base-o]) and light leds backwards (step -1)"
        _local_graph_number__leds_counter_index__iteration_step__int = -1
        _local_graph_number__leds_counter_index__base0__int = 24
    else:
        _system_StringVariable_AsComment = "Bot needs to go counter-clock-wise, so start at (0,0): led #0[base-0]) and light leds backwards (step +1)"
        _local_graph_number__leds_counter_index__iteration_step__int = 1
        _local_graph_number__leds_counter_index__base0__int = 0
    if True:
        for index2 in range(_local_graph_number__leds_needed__base1__int):
            led.plot(_local_graph_number__leds_counter_index__base0__int % 5,
                Math.idiv(_local_graph_number__leds_counter_index__base0__int, 5))
            _local_graph_number__leds_counter_index__base0__int += _local_graph_number__leds_counter_index__iteration_step__int

def on_button_pressed_b():
    global mode_Force_Straight_WithGyroscope_Bool, mode_Force_Straight_WithOutGyroscope_Bool
    if True:
        mode_Force_Straight_WithGyroscope_Bool = False
        mode_Force_Straight_WithOutGyroscope_Bool = True
        basic.show_icon(IconNames.SMALL_DIAMOND)
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_gesture_tilt_right():
    global sensor_Compass_Direction__Detect_Delta_Now__DegreesToPower__K_Proportional_MagicFactor__Int, _system_StringVariable_AsComment
    if True:
        sensor_Compass_Direction__Detect_Delta_Now__DegreesToPower__K_Proportional_MagicFactor__Int = sensor_Compass_Direction__Detect_Delta_Now__DegreesToPower__K_Proportional_MagicFactor__Int - 0.1
        _system_StringVariable_AsComment = "DEBUG TODO"
input.on_gesture(Gesture.TILT_RIGHT, on_gesture_tilt_right)

def on_gesture_logo_down():
    global sensor_Compass_Direction__Detect_Delta_Summation__DegreesToPower__K_Integral_MagicFactor__Int, _system_StringVariable_AsComment
    if True:
        sensor_Compass_Direction__Detect_Delta_Summation__DegreesToPower__K_Integral_MagicFactor__Int = sensor_Compass_Direction__Detect_Delta_Summation__DegreesToPower__K_Integral_MagicFactor__Int - 0.01
        _system_StringVariable_AsComment = "DEBUG TODO"
input.on_gesture(Gesture.LOGO_DOWN, on_gesture_logo_down)

def do_Motor_Run_Func(motorPowerRightIntIn: number, motorPowerLeftIntIn: number):
    if motor_Type_Fitech1pt5KgCm_Servo_180DegMax_On_Bool:
        wuKong.set_servo_angle(wuKong.ServoTypeList._180,
            wuKong.ServoList.S0,
            motorPowerRightIntIn)
        wuKong.set_servo_angle(wuKong.ServoTypeList._180,
            wuKong.ServoList.S1,
            motorPowerLeftIntIn)
def go_Stop_Func():
    global motor_Power_Right_Int, motor_Power_Left_Int
    if True:
        motor_Power_Right_Int = motor_Power_STOP_INT
        motor_Power_Left_Int = motor_Power_STOP_INT
        do_Motor_Run_Func(motor_Power_Right_Int, motor_Power_Left_Int)
"""

* Motors

** Significant Range for 180-Degrees: 60 to 85 then 95 to 120

"""
mode_State_Old_Str = ""
mode_State_Now_Str = ""
_local_graph_number__leds_counter_index__iteration_step__int = 0
_local_graph_number__leds_counter_index__base0__int = 0
_local_graph_number__leds_needed__base1__int = 0
mode_State_Pause_Bool = False
_local_string_out = ""
sensor_Compass_Direction__Detect_Delta__DegreesToPower__K_Total_Fix__Int = 0
sensor_Compass_Direction__Detect_Delta_Summation_Old__Int = 0
motor_Power_Right_Int = 0
mode_Force_Straight_WithGyroscope_Bool = False
mode_Force_Straight_WithOutGyroscope_Bool = False
motor_Power_Forward__OffsetFromIdle_AsBase_Int = 0
sensor_Compass_Direction__Detect_Delta_Change__DegreesToPower__K_Derivative_Fix__Int = 0
sensor_Compass_Direction__Detect_Delta_Change__DegreesToPower__K_Derivative_MagicFactor__Int = 0
sensor_Compass_Direction__Detect_Delta_Change__Int = 0
sensor_Compass_Direction__Detect_Delta_Old__Degrees__Int = 0
sensor_Compass_Direction__Detect_Delta_Summation__DegreesToPower__K_Integral_Fix__Int = 0
sensor_Compass_Direction__Detect_Delta_Summation__DegreesToPower__K_Integral_MagicFactor__Int = 0
sensor_Compass_Direction__Detect_Delta_Summation_Now__Int = 0
sensor_Compass_Direction__Detect_Delta_Now__DegreesToPower__K_Proportional_Fix__Int = 0
sensor_Compass_Direction__Detect_Delta_Now__DegreesToPower__K_Proportional_MagicFactor__Int = 0
sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int = 0
sensor_Compass_Direction__Detect_First_Trigger__Bool = False
sensor_Compass_Direction__Detect_Target__Degrees__Int = 0
sensor_Compass_Direction__Me_Old__Degrees__Int = 0
sensor_Compass_Direction__Me_Now__Degrees__Int = 0
motor_Power_Left_Int = 0
motor_Power_STOP_INT = 0
motor_Power_MAX_INT = 0
motor_Power_MIN_INT = 0
motor_Type_Fitech1pt5KgCm_Servo_180DegMax_On_Bool = False
cpu_Throttle_DELAY_MSEC_INT = 0
_system_Bool_TRUE_AS_1_INT = 0
_system_Bool_FALSE_AS_0_INT = 0
_system_StringVariable_AsComment = ""
if True:
    basic.show_icon(IconNames.HEART)
    basic.pause(2000)
    basic.show_icon(IconNames.HAPPY)
if True:
    _system_StringVariable_AsComment = "Useful to convert Digital-Pin Reads to Bool-Types"
    _system_Bool_FALSE_AS_0_INT = 0
    _system_Bool_TRUE_AS_1_INT = 1
if True:
    _system_StringVariable_AsComment = "OLED: https://github.com/makecode-extensions/OLED12864_I2C"
    OLED12864_I2C.init(60)
    OLED12864_I2C.on()
    OLED12864_I2C.clear()
    OLED12864_I2C.show_string(0, 0, "RQ-EV4-Rover", 1)
if True:
    wuKong.set_light_mode(wuKong.LightMode.BREATH)
    wuKong.light_intensity(100)
    _system_StringVariable_AsComment = "Keep low to not be annoying, 256, 127, 63, 32, 48, 36, 32 too low, 36, 48 too low, try 50, 127 "
    music.set_volume(255)
    _system_StringVariable_AsComment = "Was 500ms, but decrease for more real-time gyroscope processing, try 100ms for 10fps, real-time, 50ms for 20fps, vs. debugging 1sec or 500ms :),  "
    _system_StringVariable_AsComment = "100ms"
    cpu_Throttle_DELAY_MSEC_INT = 100
if True:
    _system_StringVariable_AsComment = "Fitec FS90R: 1.5kg*cm: Continuous Servo: 180degrees Max"
    _system_StringVariable_AsComment = "If pin is Connected to 'Vout', then reads True (1). "
    motor_Type_Fitech1pt5KgCm_Servo_180DegMax_On_Bool = True
    if True:
        _system_StringVariable_AsComment = "Special Parameters, Tighten Boundaries since Fitech is very fast and need to slow it down: was [0,180]"
        motor_Power_MIN_INT = 60
        motor_Power_MAX_INT = 120
        motor_Power_STOP_INT = 90
    if True:
        motor_Power_Left_Int = motor_Power_STOP_INT
        motor_Power_Left_Int = motor_Power_STOP_INT
        wuKong.set_servo_angle(wuKong.ServoTypeList._180,
            wuKong.ServoList.S0,
            motor_Power_STOP_INT)
        wuKong.set_servo_angle(wuKong.ServoTypeList._180,
            wuKong.ServoList.S1,
            motor_Power_STOP_INT)
    basic.show_string("P15=1")
if True:
    _system_StringVariable_AsComment = "Search & Detect"
    if True:
        if True:
            _system_StringVariable_AsComment = "General"
            sensor_Compass_Direction__Me_Now__Degrees__Int = 0
            sensor_Compass_Direction__Me_Old__Degrees__Int = 0
            sensor_Compass_Direction__Detect_Target__Degrees__Int = 0
            _system_StringVariable_AsComment = "Default: True"
            sensor_Compass_Direction__Detect_First_Trigger__Bool = True
        _system_StringVariable_AsComment = "K-Proportional"
        sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int = 0
        _system_StringVariable_AsComment = "Trial & Error: 1.0 +/-0.5 then +/-0.1: 0.8, 0.6, 0.4, 0.3, 0.2 good - fairly smooth, 0.1 not strong enough"
        sensor_Compass_Direction__Detect_Delta_Now__DegreesToPower__K_Proportional_MagicFactor__Int = 0.2
        sensor_Compass_Direction__Detect_Delta_Now__DegreesToPower__K_Proportional_Fix__Int = 0
        if True:
            _system_StringVariable_AsComment = "K-Integral"
            sensor_Compass_Direction__Detect_Delta_Summation_Now__Int = 0
            _system_StringVariable_AsComment = "Trial & Error:  0.05 +/-0.01 then =/-0.005: "
            _system_StringVariable_AsComment = "0.04 bad, 0.03 not bad, 0.02 better, 0.01 not good"
            sensor_Compass_Direction__Detect_Delta_Summation__DegreesToPower__K_Integral_MagicFactor__Int = 0.02
            sensor_Compass_Direction__Detect_Delta_Summation__DegreesToPower__K_Integral_Fix__Int = 0
        if True:
            _system_StringVariable_AsComment = "K-Derivative"
            sensor_Compass_Direction__Detect_Delta_Old__Degrees__Int = 0
            sensor_Compass_Direction__Detect_Delta_Change__Int = 0
            _system_StringVariable_AsComment = "Trial & Error: 1.0 +/-0.5 then +/-0.1: "
            _system_StringVariable_AsComment = "50ms: 0.4 jaggidy, 0.3  better, 0.2 worst, and 1, 2, 3 not do so well; but overall Kd doesn't seem that helpful, so turnoff. "
            sensor_Compass_Direction__Detect_Delta_Change__DegreesToPower__K_Derivative_MagicFactor__Int = 0
            sensor_Compass_Direction__Detect_Delta_Change__DegreesToPower__K_Derivative_Fix__Int = 0
    if True:
        _system_StringVariable_AsComment = "Default to 'True'"
    if True:
        _system_StringVariable_AsComment = "For Convert_FromDegree_ToPower"
        _system_StringVariable_AsComment = "Start w/ 30, then try 60, 90"
        _system_StringVariable_AsComment = "Start w/ 45, 30, 15"
        motor_Power_Forward__OffsetFromIdle_AsBase_Int = 15
    if True:
        _system_StringVariable_AsComment = "For Debug Testing"
        mode_Force_Straight_WithOutGyroscope_Bool = False
        mode_Force_Straight_WithGyroscope_Bool = False

def on_forever():
    global _system_StringVariable_AsComment, sensor_Compass_Direction__Me_Old__Degrees__Int, sensor_Compass_Direction__Me_Now__Degrees__Int, mode_State_Now_Str, sensor_Compass_Direction__Detect_First_Trigger__Bool, sensor_Compass_Direction__Detect_Target__Degrees__Int, sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int, mode_State_Old_Str
    if True:
        _system_StringVariable_AsComment = "P8 Designed for Analog Out (versus Digital Out)"
        if True:
            sensor_Compass_Direction__Me_Old__Degrees__Int = sensor_Compass_Direction__Me_Now__Degrees__Int
            _system_StringVariable_AsComment = "Usage of 'compass heading' block auto-requires one-time initialization of screen until loading of another program"
            _system_StringVariable_AsComment = "Adjust compass 180-degrees since facing rear of bot"
            sensor_Compass_Direction__Me_Now__Degrees__Int = input.compass_heading() + 180
            if sensor_Compass_Direction__Me_Now__Degrees__Int > 360:
                sensor_Compass_Direction__Me_Now__Degrees__Int += -360
    # } else if (sensor_Sonar_Echo_YesDetect_Distance_Cm_Int <= sensor_Sonar_Echo_YesDetect_RANGE_MAX_CM_INT || mode_Force_Straight_WithGyroscope_Bool || mode_Force_Straight_WithOutGyroscope_Bool) {
    if mode_State_Pause_Bool:
        mode_State_Now_Str = " P"
        go_Stop_Func()
    elif mode_Force_Straight_WithGyroscope_Bool or mode_Force_Straight_WithOutGyroscope_Bool:
        mode_State_Now_Str = " D"
        if sensor_Compass_Direction__Detect_First_Trigger__Bool:
            sensor_Compass_Direction__Detect_First_Trigger__Bool = False
            sensor_Compass_Direction__Detect_Target__Degrees__Int = sensor_Compass_Direction__Me_Now__Degrees__Int
        else:
            if True:
                _system_StringVariable_AsComment = "Since PID formula, No longer Constraits for optimum PID algorithm"
                sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int = sensor_Compass_Direction__Detect_Target__Degrees__Int - sensor_Compass_Direction__Me_Now__Degrees__Int
                _system_StringVariable_AsComment = "Bot should always take the shortest turn possible, esp. when > 180 or < -180, thus find the supplement by adding +/- 360"
                _system_StringVariable_AsComment = "Though Kp-Fix would be fine, Ki-Fix would be thrown-off/misinterpret as a failure to reverse course to continue zig-zag across target-degrees "
                if sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int > 180:
                    sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int = sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int - 360
                elif sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int < -180:
                    sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int = sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int + 360
        if True:
            _system_StringVariable_AsComment = "DEBUG TODO: Clear Screen for New Cpu-Cycle"
            OLED12864_I2C.clear()
            OLED12864_I2C.show_string(0,
                0,
                "" + do_NumberPadder_AsStringOut_Func(sensor_Compass_Direction__Detect_Target__Degrees__Int, 3) + "-" + do_NumberPadder_AsStringOut_Func(sensor_Compass_Direction__Me_Now__Degrees__Int, 3) + "=" + do_NumberPadder_AsStringOut_Func(sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int, 4),
                1)
        do_Detect_Mode_Func()
    else:
        _system_StringVariable_AsComment = "If All Above Conditions Fail, then Following Default Mode: Stop"
        mode_State_Now_Str = " S"
    mode_State_Old_Str = mode_State_Now_Str
    _system_StringVariable_AsComment = "Standard Delay to prevent Cpu-Overload"
    basic.pause(cpu_Throttle_DELAY_MSEC_INT)
basic.forever(on_forever)
