import { View, Text } from 'react-native';

type ScreenTitleProps = {
  title: string;
  subtitle: string;
};

export default function ScreenTitle({ title, subtitle }: ScreenTitleProps) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: '700' }}>{title}</Text>
      <Text style={{ marginTop: 6, color: '#555555' }}>{subtitle}</Text>
    </View>
  );
}
