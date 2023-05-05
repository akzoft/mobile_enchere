import React from 'react';
import DateTimeDisplay from './DateTimeDisplay';
import { useCountdown } from './useCountDown';
import { Text, View } from 'react-native';
import { Colors } from '../../../libs';

const ExpiredNotice = () => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: Colors.danger }}>Expiré!!!</Text>
    </View>
  );
};

const ShowCounter = ({ alertDay, days, hours, minutes, seconds, hideLabel, size, txtSize, separator }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
      <DateTimeDisplay value={days} type={'jours'} isDanger={days <= alertDay || 3} hideLabel={hideLabel} size={size} txtSize={txtSize} />
      {separator && <Text style={{ fontSize: size }}>:</Text>}
      <DateTimeDisplay value={hours} type={'heures'} isDanger={false} hideLabel={hideLabel} size={size} txtSize={txtSize} />
      {separator && <Text style={{ fontSize: size }}>:</Text>}
      <DateTimeDisplay value={minutes} type={'minutes'} isDanger={false} hideLabel={hideLabel} size={size} txtSize={txtSize} />
      {separator && <Text style={{ fontSize: size }}>:</Text>}
      <DateTimeDisplay value={seconds} type={'secondes'} isDanger={false} hideLabel={hideLabel} size={size} txtSize={txtSize} />
    </View>
  );
};

const CountdownTimer = ({ targetDate, hideLabel, size, txtSize }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
        hideLabel={hideLabel}
        size={size}
        txtSize={txtSize}
      />
    );
  }
};

export default CountdownTimer;
