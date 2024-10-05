import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";

interface LessonCardProps {
  title: string;
  duration: string;
  imageUrl: string;
  isCompleted?: boolean;
  onPress: () => void;
}

const LessonCard: React.FC<LessonCardProps> = ({
  title,
  duration,
  imageUrl,
  isCompleted,
  onPress,
}) => {
  return (
    <Container onPress={onPress}>
      <ImageBackground source={{ uri: imageUrl }} />
      <ContentWrapper>
        <Title>{title}</Title>
        <SubTitle>{duration} - Lesson</SubTitle>
      </ContentWrapper>
      {isCompleted ? (
        <CompletedIcon name="checkmark-circle" size={24} color="#4CD964" />
      ) : (
        <PlayIcon name="play" size={24} color="#007AFF" />
      )}
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: #1e1e1e;
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 12px;
`;

const ImageBackground = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  margin-right: 12px;
`;

const ContentWrapper = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const SubTitle = styled.Text`
  color: #a0a0a0;
  font-size: 14px;
`;

const CompletedIcon = styled(Ionicons)`
  margin-left: 12px;
`;

const PlayIcon = styled(Ionicons)`
  margin-left: 12px;
`;

export default LessonCard;
