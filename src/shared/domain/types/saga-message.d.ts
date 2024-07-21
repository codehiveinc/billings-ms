type SagaMessageModel = {
  uuid: string;
  success: boolean;
  data: object | null;
  datetime: string;
};

export default SagaMessageModel;
