/**
 * IMPORTANT NEWS
 * 
 * 22-1008
 * 
 * * Delicately Calibrate Gyroscope, using consistent/even/balanced titling on all sides for accurate/balanced mapping.  Try not to have marble fall off edge.
 * 
 *  
 * 
 * TODO
 * 
 * * Fix fixed-decimal length for print oled and serial
 * 
 * * Remove 'detect' obsolete in variable name
 * 
 * IMPORTANT NEWS
 * 
 * * Titl screen but not go past perpendicular to ground or axis get skewed
 * 
 * 22-0521-1500
 * 
 * * P8 Designed for Analog Out (versus Digital Out)
 * 
 * * do_Detect_Mode_Func
 * 
 * ** K-Proportional Fix: >>> 1st Derivative (Velocity Factor) <<< : Proportional to Slope_Velocity[Delta=Target-Bot]]) : Bot's (B) Degrees_Correction [Directional Velocity] (CW/CCW) to reach Target (T)
 * 
 * ** K-Integral Fix: >>> Integral (Summation) of 1st Derivative <<< : Summation of Past Degrees_Corrections (Cw-or-CCW) to apply Same CW_or_CCW_Bias_Boost to Current_Next Degress_Correction
 * 
 * ** K-Derivative Fix: >>> 2nd Derivative (Acceleration Factor) <<< : If Velocity is constant, then 0 2nd_Deriv (Bias_Boost), If Velocity Inc/Dec, then Accel (non-zero) Bias_Boost in resulting CW-CCW
 * 
 * 22-06xx
 * 
 * * Invert  microbit screen for Readability
 * 
 * * Usage of 'compass heading' block auto-requires one-time initialization of screen until loading of another program
 * 
 * 22-0916
 * 
 * * Each CommentAsAStringVariable took about 10 bytes
 * 
 * * But Blocks of RealCode takes about 100-300 bytes
 * 
 * * OLED: 8 Rows (0-7) x 25 Char
 * 
 * * GeekServo-Green: center 180 idle: 0,360,, 90,270,, 135, 225,, no 160,200, yn 155,205, y 150, 210, y 0, 360
 * 
 * * GeekServo-Red: Not stable 
 * 
 * * FiTechServo: Blue: Tighten Boundaries since Fitech is very fast and need to slow it down: was [0,180
 * 
 * * If Digital Pin is Open (Default) or Connected to 'Gnd', then reads Lo (0). 
 * 
 * * If Digital Pin Connected to 'Vout', then reads Hi (1). 
 * 
 * * Delta-Max = 90
 * 
 * * Since PID formula, No longer Constraits for optimum PID algorithm
 * 
 * 22-0918-1820
 * 
 * * min 120, max 240, stop 180: Window Offset 90 Min (100 ok)
 * 
 * * Ligght Sensor Pot great to set Green LIght Activate when min Threshold to Detect StopTarget on NonReflectTape
 * 
 * 22-919-0020
 * 
 * * Kp 0.3, 0.4, 0.5 not bad, 0.6 more zig-zag with Ki=0, Kd=0
 * 
 * * Kp 0.3, Kd = 0.2, 0.3, 0.4, 0.5, 0.6 does provide burst correction, but not long-lasting, seems that Kp is more effective, stronger, faster
 * 
 * 22-0919-0500
 * 
 * * StopNonReflectLine
 * 
 * ** 50ms to 25ms CpuCycle seems better for real-time response and screen readibility
 * 
 * ** 90 to 130 WinOffset to Stop
 * 
 * ** 30 OffsetFromIdle
 * 
 * ** Potentiometer: 2 Embedded dots show pointer-slot between 1 (marked w/ shiny metal) and 2
 * 
 * ** Start in middle and counter-clockwise to min threshold for off-light, at around 700-800 > to leave room for 900-1000, earliest detect of NonReflectLine for safety-buffer zone in back
 * 
 * 22-0930
 * 
 * * TODO
 * 
 * ** Remove 'Detect' from variable name
 * 
 * ** Del sensor_LightNotReflect_ValueTarget_2SensorsAvg_Int
 * 
 * ** Improve fixed decimal rounding
 * 
 * ** Do not use music, since takes alot of memory space
 * 
 * * changed code to go 90_degrees, change adjustfordeadzone 15 to 20, Kp=0 was 0.5
 * 
 * * TODO :
 * 
 * ** motor_Power_Forward__OffsetFromIdle_AsPowerBase_PidStraight_Int
 * 
 * ** motor_Power_AdjustForDeadzoneOffsetFromIdle_AsNewPowerBase_Int
 * 
 * ** Remove '*Detect*'
 * 
 * 22-1006
 * 
 * * Seems like will need full PID to compensate for motors limitation such as 'motor_PowerDeadzone_OffsetFromIdle_AsNewPowerStartBase_Int' and min pwr to go 'motor_PowerForwardMin_OffsetFromNewPowerStartBase_Int'
 * 
 * * Kp, Kd, Ki
 * 
 * ** 0.5, 0.2, 0.001  >> 0.03 :)+
 * 
 * ** 0.5, 0.2, 0.02  : )+ kindof of slow, yet farily accurate
 * 
 * ** 0.5, 0.4, 0.4 erratic
 * 
 * ** 0.5, 0.3, .03  not too good, so try 0.4, 0.2, 0.02
 * 
 * ** 0.4 0.4 0.04  : )+
 * 
 * ** .2 .2 .4
 * 
 * ** .1 .1 .2  since would race too fast, slow down motors
 * 
 * 22-1007-1220
 * 
 * * Seems that Kd counters-too-much when Kp slows down toards Target.  Maybe remove Kd. 
 * 
 * ** Try Kp and Ki only (no Kd)  Still need Ki to counter Idle-DeadZone
 * 
 * * Also noted that gyroscope not reliable 90_deg actually 180_deg at my office, to right of laptop
 * 
 * *
 */
function go_Motor_Run_Func (motorPowerRightIntIn: number, motorPowerLeftIntIn: number) {
    if (motor_Type_GeekServo0pt5KgCm_Servo_180DegMax_On_Bool) {
        wuKong.setServoAngle(wuKong.ServoTypeList._180, wuKong.ServoList.S0, motorPowerRightIntIn)
        wuKong.setServoAngle(wuKong.ServoTypeList._180, wuKong.ServoList.S1, motorPowerLeftIntIn)
    }
    if (motor_Type_Fitech1pt5KgCm_Servo_180DegMax_On_Bool) {
        wuKong.setServoAngle(wuKong.ServoTypeList._180, wuKong.ServoList.S0, motorPowerRightIntIn)
        wuKong.setServoAngle(wuKong.ServoTypeList._180, wuKong.ServoList.S1, motorPowerLeftIntIn)
    }
}
input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    _system_StringVariable_AsComment = "Straight-PDI_No"
    if (true) {
        sensor_Compass_Direction__FirstPassForSetup_Stage1__Bool = true
        sensor_Compass_Direction__FirstPassForSetup_Stage2__Bool = true
        sensor_Compass_Direction__Detect_Target_TurningOffset__Degrees__Int = 0
        motor_PowerAdjust_Stage1_AvoidIdleDeadzone_AsOffset_ForTurnsAndStraights_Int = 20
        motor_PowerAdjust_Stage2_PdiBaseMotion_AsOffset_ForStraights_Int = 20
    }
    if (true) {
        mode_Force_Straight_PdiNot_GyroscopeNot_Bool = true
        basic.showIcon(IconNames.Chessboard)
        basic.pause(500)
    }
})
input.onButtonPressed(Button.A, function () {
    _system_StringVariable_AsComment = "Turn-PDI_Yes: 90Deg"
    if (true) {
        sensor_Compass_Direction__FirstPassForSetup_Stage1__Bool = true
        sensor_Compass_Direction__FirstPassForSetup_Stage2__Bool = true
        sensor_Compass_Direction__Detect_Target_TurningOffset__Degrees__Int = 90
        motor_PowerAdjust_Stage1_AvoidIdleDeadzone_AsOffset_ForTurnsAndStraights_Int = 20
        motor_PowerAdjust_Stage2_PdiBaseMotion_AsOffset_ForStraights_Int = 0
    }
    if (true) {
        mode_Force_Turn_Pdi_Gyroscope_Bool = true
        basic.showIcon(IconNames.Diamond)
        basic.pause(500)
    }
})
input.onGesture(Gesture.LogoUp, function () {
    sensor_Compass_Direction__Detect_Delta_Summation__DegreesToPower__K_Integral_MagicConvert__Int = sensor_Compass_Direction__Detect_Delta_Summation__DegreesToPower__K_Integral_MagicConvert__Int + 0.005
    do_Confirm_Request_Increase_Func()
})
input.onGesture(Gesture.TiltLeft, function () {
    sensor_Compass_Direction__Detect_Delta_Now__DegreesToPower__K_Proportional_MagicConvert__Int = sensor_Compass_Direction__Detect_Delta_Now__DegreesToPower__K_Proportional_MagicConvert__Int + 0.05
    sensor_Compass_Direction__Detect_Delta_Change__DegreesToPower__K_Derivative_MagicConvert__Int = sensor_Compass_Direction__Detect_Delta_Change__DegreesToPower__K_Derivative_MagicConvert__Int + 0.05
    if (false) {
        motor_Power_Right_Int += -1
        motor_Power_Left_Int += 1
        go_Motor_Run_Func(motor_Power_Right_Int, motor_Power_Left_Int)
    }
    do_Confirm_Request_Increase_Func()
})
function do_Confirm_Request_Increase_Func () {
    led.plot(0, 2)
    basic.clearScreen()
    basic.pause(500)
}
function do_NumberPadder_AsStringOut_Func (number_in: number, string_len_max_in: number, decimal_places_in: number) {
    _local_number_with_fixed_decimal_deci = Math.round(number_in * 10 ** decimal_places_in) / 10 ** decimal_places_in
    _local_string_out = convertToText(_local_number_with_fixed_decimal_deci)
    _local_loop_count_max = string_len_max_in - _local_string_out.length
    for (let index = 0; index < _local_loop_count_max; index++) {
        _local_string_out = " " + _local_string_out
    }
    return _local_string_out
}
input.onButtonPressed(Button.AB, function () {
    input.calibrateCompass()
})
// do_GraphNumber_Func
function do_GraphNumber_Func (number_to_graph_in: number, number_to_graph__absolute_max_in: number) {
    if (true) {
        _system_StringVariable_AsComment = "Start {0,0) or (4,4): 25 leds"
        _local_graph_number__leds_needed__base1__int = Math.idiv(Math.constrain(Math.abs(number_to_graph_in), 0, number_to_graph__absolute_max_in), number_to_graph__absolute_max_in / graph_Number__Leds_Counter_MAX__BASE1__INT)
        basic.clearScreen()
        _local_graph_number__leds_counter_index__base0__int = 0
        if (number_to_graph_in >= 0) {
            _system_StringVariable_AsComment = "Bot CW: start (4,4): led #24[base-0] & light leds backward (step -1)"
            _local_graph_number__leds_counter_index__iteration_step__int = -1
            _local_graph_number__leds_counter_index__base0__int = 24
            // No-Need to invert/reverse direction for true clockwise
            _local_graph_number__x_axis_invert_offset__int = 0
            led.plotBrightness(2, 0, 32)
        } else {
            _system_StringVariable_AsComment = "Bot CCW: start (0,0): led #00[base-0] & light leds forward (step +1)"
            _local_graph_number__leds_counter_index__iteration_step__int = 1
            _local_graph_number__leds_counter_index__base0__int = 0
            // Need to invert/reverse direction for true counter-clockwise
            _local_graph_number__x_axis_invert_offset__int = -4
            led.plotBrightness(2, 4, 32)
        }
        for (let index = 0; index < _local_graph_number__leds_needed__base1__int; index++) {
            led.plot(Math.abs(_local_graph_number__leds_counter_index__base0__int % 5 + _local_graph_number__x_axis_invert_offset__int), Math.idiv(_local_graph_number__leds_counter_index__base0__int, 5))
            _local_graph_number__leds_counter_index__base0__int += _local_graph_number__leds_counter_index__iteration_step__int
        }
    }
}
input.onButtonPressed(Button.B, function () {
	
})
function do_PrintString_Fn (textStrIn: string, xColBase0In: number, yRowBase0In: number, colorIntIn: number, borderTopBoolIn: boolean, borderBottomBoolIn: boolean) {
    OLED12864_I2C.showString(
    xColBase0In,
    yRowBase0In,
    textStrIn,
    colorIntIn
    )
    if (borderTopBoolIn) {
        serial.writeLine("")
    }
    serial.writeString(textStrIn)
    serial.writeString("|")
    if (borderBottomBoolIn) {
        serial.writeLine("")
    }
}
input.onGesture(Gesture.TiltRight, function () {
    sensor_Compass_Direction__Detect_Delta_Now__DegreesToPower__K_Proportional_MagicConvert__Int = sensor_Compass_Direction__Detect_Delta_Now__DegreesToPower__K_Proportional_MagicConvert__Int - 0.05
    sensor_Compass_Direction__Detect_Delta_Change__DegreesToPower__K_Derivative_MagicConvert__Int = sensor_Compass_Direction__Detect_Delta_Change__DegreesToPower__K_Derivative_MagicConvert__Int - 0.05
    if (false) {
        motor_Power_Right_Int += 1
        motor_Power_Left_Int += -1
        go_Motor_Run_Func(motor_Power_Right_Int, motor_Power_Left_Int)
    }
    do_Confirm_Request_Decrease_Func()
})
input.onGesture(Gesture.LogoDown, function () {
    sensor_Compass_Direction__Detect_Delta_Summation__DegreesToPower__K_Integral_MagicConvert__Int = sensor_Compass_Direction__Detect_Delta_Summation__DegreesToPower__K_Integral_MagicConvert__Int - 0.005
    do_Confirm_Request_Decrease_Func()
})
function go_Stop_Func () {
    if (true) {
        motor_Power_Right_Int = motor_Power_STOP_INT
        motor_Power_Left_Int = motor_Power_STOP_INT
        go_Motor_Run_Func(motor_Power_Right_Int, motor_Power_Left_Int)
    }
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    _system_StringVariable_AsComment = "Straight-PDI_Yes"
    if (true) {
        sensor_Compass_Direction__FirstPassForSetup_Stage1__Bool = true
        sensor_Compass_Direction__FirstPassForSetup_Stage2__Bool = true
        sensor_Compass_Direction__Detect_Target_TurningOffset__Degrees__Int = 0
        motor_PowerAdjust_Stage1_AvoidIdleDeadzone_AsOffset_ForTurnsAndStraights_Int = 20
        motor_PowerAdjust_Stage2_PdiBaseMotion_AsOffset_ForStraights_Int = 20
    }
    if (true) {
        mode_Force_Straight_Pdi_Gyroscope_Bool = true
        basic.showIcon(IconNames.Sword)
        basic.pause(500)
    }
})
function do_Confirm_Request_Decrease_Func () {
    led.plot(4, 2)
    basic.clearScreen()
    basic.pause(500)
}
function do_Turn_Or_Straight_PDI_Func () {
    if (mode_Force_Turn_Pdi_Gyroscope_Bool || mode_Force_Straight_Pdi_Gyroscope_Bool || mode_Force_Straight_PdiNot_GyroscopeNot_Bool) {
        if (true) {
            // Proportional-Turning Error-Adjustments based on Distance from Target
            _system_StringVariable_AsComment = "P: Pivot: *** Proportional-Boost To Error(Bot_Distance_From_Target)"
            sensor_Compass_Direction__Detect_Delta_Now__DegreesToPower__K_Proportional_Fix__Int = sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int * sensor_Compass_Direction__Detect_Delta_Now__DegreesToPower__K_Proportional_MagicConvert__Int
        }
        if (true) {
            // *** K-Integral Fix: Integral (Summation) of Above Proportional-Turning Error-Adjustments: Boost when Error Not Constructively Decreasing (Destructively Either Stuck or Increasing)
            // 
            // *** Ki Fix: **** Greater Weight/Summation of Positive KpFix (Cw) = Greater Positive Enahance_Now/Momentum_Later (Cw) **** Greater Weight/Summation of Negative KpFix (CCw) = Greater Negatve Enahance_Now/Momentum_Later (CCw)
            // 
            // Accel/De-Accel Boost/Enhancer
            // 
            _system_StringVariable_AsComment = "D: Difference: Setup"
            // Kd Fix: On First-Pass, when KpFix > 0, KdFix should be 0 - since 'Delta_Old__Degrees__Int' is non-existent, otherwise inaccurately adding a redundant KpFix (thus x2 over_fix)
            if (sensor_Compass_Direction__FirstPassForSetup_Stage2__Bool && sensor_Compass_Direction__Detect_Delta_Now__DegreesToPower__K_Proportional_Fix__Int > 0) {
                sensor_Compass_Direction__FirstPassForSetup_Stage2__Bool = false
                sensor_Compass_Direction__Detect_Delta_Old__Degrees__Int = sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int
            }
            // *** K-Integral Fix: Integral (Summation) of Above Proportional-Turning Error-Adjustments: Boost when Error Not Constructively Decreasing (Destructively Either Stuck or Increasing)
            // 
            // *** Ki Fix: **** Greater Weight/Summation of Positive KpFix (Cw) = Greater Positive Enahance_Now/Momentum_Later (Cw) **** Greater Weight/Summation of Negative KpFix (CCw) = Greater Negatve Enahance_Now/Momentum_Later (CCw)
            // 
            // Accel/De-Accel Boost/Enhancer
            // 
            _system_StringVariable_AsComment = "D: *** When P DEC, D -Value (CCW) *** When P INC, D +Value (CW)"
            sensor_Compass_Direction__Detect_Delta_Change__Int = sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int - sensor_Compass_Direction__Detect_Delta_Old__Degrees__Int
            sensor_Compass_Direction__Detect_Delta_Change__DegreesToPower__K_Derivative_Fix__Int = sensor_Compass_Direction__Detect_Delta_Change__Int * sensor_Compass_Direction__Detect_Delta_Change__DegreesToPower__K_Derivative_MagicConvert__Int
            sensor_Compass_Direction__Detect_Delta_Old__Degrees__Int = sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int
        }
        if (true) {
            // *** K-Integral Fix: Integral (Summation) of Above Proportional-Turning Error-Adjustments: Boost when Error Not Constructively Decreasing (Destructively Either Stuck or Increasing)
            // 
            // *** Ki Fix: **** Greater Weight/Summation of Positive KpFix (Cw) = Greater Positive Enahance_Now/Momentum_Later (Cw) **** Greater Weight/Summation of Negative KpFix (CCw) = Greater Negatve Enahance_Now/Momentum_Later (CCw)
            // 
            // Kp (CC/CCW) Boost/Enhancer + Residue-Momentum Boost/Enhancer 
            // 
            _system_StringVariable_AsComment = "I: Include: *** Add P to Running_Total "
            sensor_Compass_Direction__Detect_Delta_Summation_Old__Int = sensor_Compass_Direction__Detect_Delta_Summation_Now__Int
            sensor_Compass_Direction__Detect_Delta_Summation_Now__Int = sensor_Compass_Direction__Detect_Delta_Summation_Now__Int + sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int
            sensor_Compass_Direction__Detect_Delta_Summation__DegreesToPower__K_Integral_Fix__Int = sensor_Compass_Direction__Detect_Delta_Summation_Now__Int * sensor_Compass_Direction__Detect_Delta_Summation__DegreesToPower__K_Integral_MagicConvert__Int
        }
        if (true) {
            _system_StringVariable_AsComment = "P + D + I Fixes"
            sensor_Compass_Direction__Detect_Delta__DegreesToPower__K_Total_Fix__Int = sensor_Compass_Direction__Detect_Delta_Now__DegreesToPower__K_Proportional_Fix__Int + sensor_Compass_Direction__Detect_Delta_Change__DegreesToPower__K_Derivative_Fix__Int + sensor_Compass_Direction__Detect_Delta_Summation__DegreesToPower__K_Integral_Fix__Int
            // Ktotal: CCW, CW, or None Icons (and Place 'motor_PowerDeadzone_OffsetFromIdle_AsNewPowerStartBase_Int' Appropiately Relative to Center-Idle_90_Degrees for PID-Turn Only
            if (sensor_Compass_Direction__Detect_Delta__DegreesToPower__K_Total_Fix__Int < 0) {
                if (true) {
                    motor_Direction_Right_Str = "^"
                    motor_Direction_Left_Str = "v"
                }
                if (mode_Force_Turn_Pdi_Gyroscope_Bool) {
                    motor_Power_Right_Int = motor_Power_STOP_INT - motor_PowerAdjust_Stage1_AvoidIdleDeadzone_AsOffset_ForTurnsAndStraights_Int
                    motor_Power_Left_Int = motor_Power_STOP_INT - motor_PowerAdjust_Stage1_AvoidIdleDeadzone_AsOffset_ForTurnsAndStraights_Int
                } else if (mode_Force_Straight_Pdi_Gyroscope_Bool || mode_Force_Straight_PdiNot_GyroscopeNot_Bool) {
                    motor_Power_Right_Int = motor_Power_STOP_INT - (motor_PowerAdjust_Stage1_AvoidIdleDeadzone_AsOffset_ForTurnsAndStraights_Int + motor_PowerAdjust_Stage2_PdiBaseMotion_AsOffset_ForStraights_Int)
                    motor_Power_Left_Int = motor_Power_STOP_INT + (motor_PowerAdjust_Stage1_AvoidIdleDeadzone_AsOffset_ForTurnsAndStraights_Int + motor_PowerAdjust_Stage2_PdiBaseMotion_AsOffset_ForStraights_Int)
                }
            } else if (sensor_Compass_Direction__Detect_Delta__DegreesToPower__K_Total_Fix__Int > 0) {
                motor_Direction_Right_Str = "v"
                motor_Direction_Left_Str = "^"
                if (mode_Force_Turn_Pdi_Gyroscope_Bool) {
                    motor_Power_Right_Int = motor_Power_STOP_INT + motor_PowerAdjust_Stage1_AvoidIdleDeadzone_AsOffset_ForTurnsAndStraights_Int
                    motor_Power_Left_Int = motor_Power_STOP_INT + motor_PowerAdjust_Stage1_AvoidIdleDeadzone_AsOffset_ForTurnsAndStraights_Int
                } else if (mode_Force_Straight_Pdi_Gyroscope_Bool || mode_Force_Straight_PdiNot_GyroscopeNot_Bool) {
                    motor_Power_Right_Int = motor_Power_STOP_INT - (motor_PowerAdjust_Stage1_AvoidIdleDeadzone_AsOffset_ForTurnsAndStraights_Int + motor_PowerAdjust_Stage2_PdiBaseMotion_AsOffset_ForStraights_Int)
                    motor_Power_Left_Int = motor_Power_STOP_INT + (motor_PowerAdjust_Stage1_AvoidIdleDeadzone_AsOffset_ForTurnsAndStraights_Int + motor_PowerAdjust_Stage2_PdiBaseMotion_AsOffset_ForStraights_Int)
                }
            } else {
                motor_Direction_Right_Str = " "
                motor_Direction_Left_Str = " "
            }
            // Add Ktotal (and 'motor_PowerForwardMin_OffsetFromIdle_Int' for PID-0Straight)
            if (mode_Force_Turn_Pdi_Gyroscope_Bool || mode_Force_Straight_Pdi_Gyroscope_Bool) {
                motor_Power_Right_Int = motor_Power_Right_Int + sensor_Compass_Direction__Detect_Delta__DegreesToPower__K_Total_Fix__Int
                motor_Power_Left_Int = motor_Power_Left_Int + sensor_Compass_Direction__Detect_Delta__DegreesToPower__K_Total_Fix__Int
            }
        }
        go_Motor_Run_Func(motor_Power_Right_Int, motor_Power_Left_Int)
    }
}
let sensor_Compass_Direction__Detect_Delta__DegreesToPower__K_Total_Fix__Int = 0
let _local_graph_number__x_axis_invert_offset__int = 0
let _local_graph_number__leds_counter_index__iteration_step__int = 0
let _local_graph_number__leds_counter_index__base0__int = 0
let _local_graph_number__leds_needed__base1__int = 0
let _local_loop_count_max = 0
let _local_string_out = ""
let _local_number_with_fixed_decimal_deci = 0
let sensor_Compass_Direction__FirstPassForSetup_Stage2__Bool = false
let motor_Direction_Left_Str = ""
let motor_Direction_Right_Str = ""
let graph_Number__Leds_Counter_MAX__BASE1__INT = 0
let mode_Force_Turn_Pdi_Gyroscope_Bool = false
let mode_Force_Straight_Pdi_Gyroscope_Bool = false
let mode_Force_Straight_PdiNot_GyroscopeNot_Bool = false
let mode_Force_StopPerpendicularTo_NonReflectLine_Bool = false
let sensor_Compass_Direction__Detect_Delta_Summation__DegreesToPower__K_Integral_Fix__Int = 0
let sensor_Compass_Direction__Detect_Delta_Summation__DegreesToPower__K_Integral_MagicConvert__Int = 0
let sensor_Compass_Direction__Detect_Delta_Summation_Now__Int = 0
let sensor_Compass_Direction__Detect_Delta_Summation_Old__Int = 0
let sensor_Compass_Direction__Detect_Delta_Change__DegreesToPower__K_Derivative_Fix__Int = 0
let sensor_Compass_Direction__Detect_Delta_Change__DegreesToPower__K_Derivative_MagicConvert__Int = 0
let sensor_Compass_Direction__Detect_Delta_Change__Int = 0
let sensor_Compass_Direction__Detect_Delta_Old__Degrees__Int = 0
let sensor_Compass_Direction__Detect_Delta_Now__DegreesToPower__K_Proportional_Fix__Int = 0
let sensor_Compass_Direction__Detect_Delta_Now__DegreesToPower__K_Proportional_MagicConvert__Int = 0
let sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int = 0
let sensor_Compass_Direction__Detect_Target_TurningOffset__Degrees__Int = 0
let sensor_Compass_Direction__FirstPassForSetup_Stage1__Bool = false
let sensor_Compass_Direction__Detect_Target__Degrees__Int = 0
let sensor_Compass_Direction__Bot_Now__Degrees__Int = 0
let _system_StringVariable_AsComment = ""
let motor_Power_Left_Int = 0
let motor_Power_Right_Int = 0
let sensor_LightNotReflect_ValueDelta_SensorAny__LightNotReflectToPower__K_Proportional_MagicConvert_Reverse__Int = 0
let sensor_LightNotReflect_ValueDelta_SensorAny__LightNotReflectToPower__K_Proportional_MagicConvert_Forward__Int = 0
let motor_PowerAdjust_Stage2_PdiBaseMotion_AsOffset_ForStraights_Int = 0
let motor_PowerAdjust_Stage1_AvoidIdleDeadzone_AsOffset_ForTurnsAndStraights_Int = 0
let motor_Power_STOP_INT = 0
let motor_Power_MAX_INT = 0
let motor_Power_MIN_INT = 0
let motor_Type_Fitech1pt5KgCm_Servo_180DegMax_On_Bool = false
let motor_Type_GeekServo0pt5KgCm_Servo_180DegMax_On_Bool = false
let cpu_Throttle_DELAY_MSEC_INT = 0
let _system_Bool_TRUE_AS_1_INT = 0
let _system_Bool_FALSE_AS_0_INT = 0
if (true) {
    basic.showIcon(IconNames.Heart)
    basic.pause(2000)
    basic.showIcon(IconNames.Happy)
}
// Useful to convert Digital-Pin Reads to Bool-Types
if (true) {
    _system_Bool_FALSE_AS_0_INT = 0
    _system_Bool_TRUE_AS_1_INT = 1
}
// OLED: https://github.com/makecode-extensions/OLED12864_I2C
if (true) {
    OLED12864_I2C.init(60)
    OLED12864_I2C.on()
    OLED12864_I2C.zoom(false)
    OLED12864_I2C.clear()
    OLED12864_I2C.showString(
    0,
    0,
    "RQ-LEGO-PRO +CW -CCW",
    1
    )
    basic.pause(2000)
}
if (true) {
    wuKong.setLightMode(wuKong.LightMode.BREATH)
    // Keep low to not be annoying, 256, 127, 63, 32, 48, 36, 32 too low, 36, 48 too low, try 50, 127 
    music.setVolume(255)
    // * Was 500ms 2fps, but decrease for more real-time gyroscope processing, try 100ms for 10fps, real-time, 50ms for 20fps, vs. debugging 1sec 1fps or 500ms :),  >> 100ms Ki overpowering?
    // * 100ms 10fps to 50ms 20fps :)+ min fps for decent real-time Kp response, but not too fast so humanly can keep-up
    // * For StopOnNonReflectLline, 50ms too long for motor duration, need faster response, so 25ms = 40fps
    cpu_Throttle_DELAY_MSEC_INT = 25
    if (pins.digitalReadPin(DigitalPin.P15) == 0) {
        motor_Type_GeekServo0pt5KgCm_Servo_180DegMax_On_Bool = true
        motor_Type_Fitech1pt5KgCm_Servo_180DegMax_On_Bool = false
        // 360-Servo
        // * For StopPerpendicularToNonReflectLine
        // ** Min 150, Max 210, Stop 180: Too Slow?
        // ** Min 120, Max 240, Stop 180 Too Fast
        // ** 135, 225, 180
        // ** 150, 210, 180 delta 30
        // ** 135, 225, 180 delta 45
        // ** 140, 220, 180 delta 40
        // 
        // * Convert from 360_degrees servo to 180_degrees servo
        // 
        // * Geek-Green-Servo: was 0, 90, 180, yet too fast, try 45, 90, 135, better but still kindof fast, 
        // * so try 60, 90, 120, PowerOffsetFromIdle=15, KpFwd=0.01,KpRev=0.02
        // ** try faster 45,90,135, as high as KpFwd=0.05, KpRev=0.10 as low as 0.01, 0.02 (x2)
        if (true) {
            motor_Power_MIN_INT = 45
            motor_Power_MAX_INT = 135
            motor_Power_STOP_INT = 90
            // * Geek-Green Servo try 60 since 360-Servo, too fast, so try 30
            // * Geek-Green Servo, convert from 360_servo to 180_servo, so 60 too fast, so try 30
            // 
            // * Geek-Green Servo: from 0 to 10 farily dead, then 15 good starts, and 20 seemingly strong start, try 15 for bare minimum for both servos
            // 
            // * 15 to 20 for 90_degrees test
            // 
            // * from 15 to 10?, NOT ENOUGH POWER, WILL STALL, THUS 15
            // ** Forward (14), 15
            // ** Reverse (16), 17
            // ***  Min Universal = 17
            // **** Actually for turning-only, not straight, then 0 is best since will stop at right angle somewhat
            // 
            // 22-1007-1320
            // * try 20 to be convervative on both sides, 0.1 0.1 0.01
            motor_PowerAdjust_Stage1_AvoidIdleDeadzone_AsOffset_ForTurnsAndStraights_Int = 20
            // * Min Value Possible for Slowest Motion for Most Accuracy: 1
            motor_PowerAdjust_Stage2_PdiBaseMotion_AsOffset_ForStraights_Int = 0
        }
        // * Less runway for 'Reverse' so should be greater multiple vs. 'Forward
        // 
        // * 60,90,120: PowerOfffsetFromIdle=15, 0.1, 0.2 to 0.01, 0.02 
        // 
        if (true) {
            sensor_LightNotReflect_ValueDelta_SensorAny__LightNotReflectToPower__K_Proportional_MagicConvert_Forward__Int = 0.01
            sensor_LightNotReflect_ValueDelta_SensorAny__LightNotReflectToPower__K_Proportional_MagicConvert_Reverse__Int = 0.02
        }
        if (true) {
            motor_Power_Right_Int = motor_Power_STOP_INT
            motor_Power_Left_Int = motor_Power_STOP_INT
            wuKong.setServoAngle(wuKong.ServoTypeList._180, wuKong.ServoList.S0, motor_Power_STOP_INT)
            wuKong.setServoAngle(wuKong.ServoTypeList._180, wuKong.ServoList.S1, motor_Power_STOP_INT)
        }
        // P15=0:Gee_Gr
        basic.showString("P15=0")
    } else {
        if (true) {
            motor_Type_GeekServo0pt5KgCm_Servo_180DegMax_On_Bool = false
            motor_Type_Fitech1pt5KgCm_Servo_180DegMax_On_Bool = true
            // * For StopPerpendicularToNonRelfectLine
            // ** Min 60, Max 120, Stop 90
            // 
            if (true) {
                motor_Power_MIN_INT = 0
                motor_Power_MAX_INT = 180
                motor_Power_STOP_INT = 90
                // * FiTech-Blue Servo: 15 but was 180-Servo
                // ** Start w/ 30, then try 60, 90, 45, 30, 15
                motor_PowerAdjust_Stage1_AvoidIdleDeadzone_AsOffset_ForTurnsAndStraights_Int = 15
                motor_PowerAdjust_Stage2_PdiBaseMotion_AsOffset_ForStraights_Int = 5
            }
            if (true) {
                motor_Power_Right_Int = motor_Power_STOP_INT
                motor_Power_Left_Int = motor_Power_STOP_INT
                wuKong.setServoAngle(wuKong.ServoTypeList._180, wuKong.ServoList.S0, motor_Power_STOP_INT)
                wuKong.setServoAngle(wuKong.ServoTypeList._180, wuKong.ServoList.S1, motor_Power_STOP_INT)
            }
            // P15=1:Fit_Bl
            basic.showString("P15=1")
        }
    }
    if (true) {
        _system_StringVariable_AsComment = "PDI"
        if (true) {
            _system_StringVariable_AsComment = "General"
            sensor_Compass_Direction__Bot_Now__Degrees__Int = 0
            sensor_Compass_Direction__Detect_Target__Degrees__Int = 0
            // Default: True
            sensor_Compass_Direction__FirstPassForSetup_Stage1__Bool = true
            // * for 90_degrees turn: tried 90 yet too small, so try 95 :)+, too much, try 90
            // * for 180_degrees turn: try 180
            // 
            sensor_Compass_Direction__Detect_Target_TurningOffset__Degrees__Int = 0
        }
        if (true) {
            _system_StringVariable_AsComment = "P"
            sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int = 0
            // * Blue FiTech:  0.8, 0.6, 0.4, 0.3, 0.2 good - fairly smooth, 0.1 not strong enough
            // * Green GeekServo: 0.2 to 0.3 to 0.4 to 0.5 (more robust), 0.6 start too strong zigzag, with Ki=0, Kd=0
            // ** Keep Kp at 0.5 since needs that strength as it drifts to right naturally @ VcsFloor, still keep Ki, Kd=0 for simplicity 
            // 
            // * was 0.5, but 0.0 to test 90_degrees turn -0r- seem to leave at 0.5
            _system_StringVariable_AsComment = "Adjust: 1.0 +/-0.5 then +/-0.1:"
            sensor_Compass_Direction__Detect_Delta_Now__DegreesToPower__K_Proportional_MagicConvert__Int = 0.1
            sensor_Compass_Direction__Detect_Delta_Now__DegreesToPower__K_Proportional_Fix__Int = 0
        }
        if (true) {
            _system_StringVariable_AsComment = "D"
            sensor_Compass_Direction__Detect_Delta_Old__Degrees__Int = 0
            sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int = 0
            sensor_Compass_Direction__Detect_Delta_Change__Int = 0
            // * Blue FiTech: 0.5 too wild swings, 0.25 is much doable, try 0.2
            // * For now, turn off for simplicity test for Kp-O
            _system_StringVariable_AsComment = "Adjust: 1.0 +/-0.5 then +/-0.1: "
            sensor_Compass_Direction__Detect_Delta_Change__DegreesToPower__K_Derivative_MagicConvert__Int = 0.1
            sensor_Compass_Direction__Detect_Delta_Change__DegreesToPower__K_Derivative_Fix__Int = 0
        }
        if (true) {
            _system_StringVariable_AsComment = "I"
            sensor_Compass_Direction__Detect_Delta_Summation_Old__Int = 0
            sensor_Compass_Direction__Detect_Delta_Summation_Now__Int = 0
            // * Blue FiTech: >>  0/.04 bad, 0.03 not bad, 0.02 better, 0.01 not good
            // * 0.02 was good, but let's turn off since erratic = 0
            _system_StringVariable_AsComment = "Adjust: 0.05 +/-0.01 then +/-0.005:"
            sensor_Compass_Direction__Detect_Delta_Summation__DegreesToPower__K_Integral_MagicConvert__Int = 0.01
            sensor_Compass_Direction__Detect_Delta_Summation__DegreesToPower__K_Integral_Fix__Int = 0
        }
    }
    if (true) {
        _system_StringVariable_AsComment = "Mode_Force"
        mode_Force_StopPerpendicularTo_NonReflectLine_Bool = false
        mode_Force_Straight_PdiNot_GyroscopeNot_Bool = false
        mode_Force_Straight_Pdi_Gyroscope_Bool = false
        mode_Force_Turn_Pdi_Gyroscope_Bool = false
    }
    if (true) {
        // Even at Max Value, still leave one LED off to show CW/CCW orientation. Thus only 25-1=24 Leds usable
        graph_Number__Leds_Counter_MAX__BASE1__INT = 24
    }
    if (true) {
        // Blank Space
        motor_Direction_Right_Str = " "
        // Blank Space
        motor_Direction_Left_Str = " "
    }
}
basic.forever(function () {
    if (true) {
        _system_StringVariable_AsComment = "Adjust compass 180-degrees for facing bot_rear -&- Wrap-around '>360'"
        sensor_Compass_Direction__Bot_Now__Degrees__Int = input.compassHeading() + 180
        if (sensor_Compass_Direction__Bot_Now__Degrees__Int > 360) {
            sensor_Compass_Direction__Bot_Now__Degrees__Int += -360
        }
    }
    if (mode_Force_Turn_Pdi_Gyroscope_Bool || mode_Force_Straight_Pdi_Gyroscope_Bool || mode_Force_Straight_PdiNot_GyroscopeNot_Bool) {
        if (sensor_Compass_Direction__FirstPassForSetup_Stage1__Bool) {
            sensor_Compass_Direction__FirstPassForSetup_Stage1__Bool = false
            // TODO: Override PID_Straight w/ Turn_Degrees_Override Beforehand
            sensor_Compass_Direction__Detect_Target__Degrees__Int = sensor_Compass_Direction__Bot_Now__Degrees__Int + sensor_Compass_Direction__Detect_Target_TurningOffset__Degrees__Int
            if (sensor_Compass_Direction__Detect_Target__Degrees__Int > 360) {
                sensor_Compass_Direction__Detect_Target__Degrees__Int = sensor_Compass_Direction__Detect_Target__Degrees__Int - 360
            }
        }
        if (true) {
            sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int = sensor_Compass_Direction__Detect_Target__Degrees__Int - sensor_Compass_Direction__Bot_Now__Degrees__Int
            _system_StringVariable_AsComment = "Bot takes shortest turn possible, esp. when > 180 or < -180, thus find supplement by add +/- 360"
            _system_StringVariable_AsComment = "Though Kp-Fix will be fine, Ki-Fix will be thrown-off/misinterpret as failure to reverse course to continue zig-zag across target_degrees "
            if (sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int > 180) {
                sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int = sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int - 360
            } else if (sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int < -180) {
                sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int = sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int + 360
            }
        }
        do_Turn_Or_Straight_PDI_Func()
    }
    if (true) {
        do_PrintString_Fn("T:" + do_NumberPadder_AsStringOut_Func(sensor_Compass_Direction__Detect_Target__Degrees__Int, 3, 0) + " - B:" + do_NumberPadder_AsStringOut_Func(sensor_Compass_Direction__Bot_Now__Degrees__Int, 3, 0) + " = " + do_NumberPadder_AsStringOut_Func(sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int, 4, 0), 0, 0, 1, false, false)
        do_PrintString_Fn(" Kp" + do_NumberPadder_AsStringOut_Func(sensor_Compass_Direction__Detect_Delta_Now__DegreesToPower__K_Proportional_MagicConvert__Int, 3, 1) + " Kd" + do_NumberPadder_AsStringOut_Func(sensor_Compass_Direction__Detect_Delta_Change__DegreesToPower__K_Derivative_MagicConvert__Int, 3, 1) + " Ki" + do_NumberPadder_AsStringOut_Func(sensor_Compass_Direction__Detect_Delta_Summation__DegreesToPower__K_Integral_MagicConvert__Int, 4, 2), 0, 1, 1, false, false)
        do_PrintString_Fn(" P:" + do_NumberPadder_AsStringOut_Func(sensor_Compass_Direction__Detect_Delta_Now__DegreesToPower__K_Proportional_Fix__Int, 5, 1) + "  D:" + do_NumberPadder_AsStringOut_Func(sensor_Compass_Direction__Detect_Delta_Change__DegreesToPower__K_Derivative_Fix__Int, 5, 1) + "  I:" + do_NumberPadder_AsStringOut_Func(sensor_Compass_Direction__Detect_Delta_Summation__DegreesToPower__K_Integral_Fix__Int, 5, 1), 0, 2, 1, false, false)
        do_PrintString_Fn(" PDI:" + do_NumberPadder_AsStringOut_Func(sensor_Compass_Direction__Detect_Delta__DegreesToPower__K_Total_Fix__Int, 5, 1) + " L:" + motor_Direction_Left_Str + do_NumberPadder_AsStringOut_Func(motor_Power_Left_Int, 3, 0) + " R:" + motor_Direction_Right_Str + do_NumberPadder_AsStringOut_Func(motor_Power_Right_Int, 3, 0), 0, 3, 1, false, false)
        do_PrintString_Fn(" 1_P(" + do_NumberPadder_AsStringOut_Func(sensor_Compass_Direction__Detect_Delta_Now__Degrees__Int, 4, 0) + "x" + do_NumberPadder_AsStringOut_Func(sensor_Compass_Direction__Detect_Delta_Now__DegreesToPower__K_Proportional_MagicConvert__Int, 3, 1) + ")=" + do_NumberPadder_AsStringOut_Func(sensor_Compass_Direction__Detect_Delta_Now__DegreesToPower__K_Proportional_Fix__Int, 5, 1), 0, 4, 1, false, false)
        do_PrintString_Fn(" 2_D(" + "" + do_NumberPadder_AsStringOut_Func(sensor_Compass_Direction__Detect_Delta_Change__Int, 4, 0) + "" + ")x" + do_NumberPadder_AsStringOut_Func(sensor_Compass_Direction__Detect_Delta_Change__DegreesToPower__K_Derivative_MagicConvert__Int, 3, 1) + "=" + do_NumberPadder_AsStringOut_Func(sensor_Compass_Direction__Detect_Delta_Change__DegreesToPower__K_Derivative_Fix__Int, 5, 1), 0, 5, 1, false, false)
        do_PrintString_Fn(" 3_I(" + do_NumberPadder_AsStringOut_Func(sensor_Compass_Direction__Detect_Delta_Summation_Old__Int, 4, 0) + "+" + do_NumberPadder_AsStringOut_Func(sensor_Compass_Direction__Detect_Delta_Summation_Now__Int, 4, 0) + ")x" + do_NumberPadder_AsStringOut_Func(sensor_Compass_Direction__Detect_Delta_Summation__DegreesToPower__K_Integral_MagicConvert__Int, 4, 2) + "=" + do_NumberPadder_AsStringOut_Func(sensor_Compass_Direction__Detect_Delta_Summation__DegreesToPower__K_Integral_Fix__Int, 5, 1), 0, 6, 1, false, false)
        do_PrintString_Fn(" Dead:" + do_NumberPadder_AsStringOut_Func(motor_PowerAdjust_Stage1_AvoidIdleDeadzone_AsOffset_ForTurnsAndStraights_Int, 2, 0) + " Base:" + do_NumberPadder_AsStringOut_Func(motor_PowerAdjust_Stage2_PdiBaseMotion_AsOffset_ForStraights_Int, 2, 0) + " Turn:" + do_NumberPadder_AsStringOut_Func(sensor_Compass_Direction__Detect_Target_TurningOffset__Degrees__Int, 3, 0), 0, 7, 1, false, true)
        do_GraphNumber_Func(sensor_Compass_Direction__Detect_Delta__DegreesToPower__K_Total_Fix__Int, graph_Number__Leds_Counter_MAX__BASE1__INT)
        if (true) {
            // Delay to prevent Cpu-Overload
            basic.pause(cpu_Throttle_DELAY_MSEC_INT)
        }
    }
})
