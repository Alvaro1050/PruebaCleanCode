Measures MS

## Version: 1.0.0

### /measures

#### POST
##### Description:

Register a measure from a channel device

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| measure | body | measure Info | Yes | [MeasureRegisterSchema](#measureregisterschema) |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 400 | Bad request. Error in params |
| 401 | Authorization information is missing or invalid. |
| 404 | Entity not found. |
| 5XX | Unexpected error. |

### /devices/:deviceId/measures

#### GET
##### Description:

Get all measures from a device

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| deviceId | path | Device Id from get the mesasures to | Yes |  |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 400 | Bad request. Error in params |
| 401 | Authorization information is missing or invalid. |
| 404 | Entity not found. |
| 5XX | Unexpected error. |

### /devices/:deviceId/channels/:channel/measures/last

#### GET
##### Description:

Get the last measures from a channel device

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| deviceId | path | Device Id to get | Yes |  |
| channel | path | channel from device | Yes |  |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 400 | Bad request. Error in params |
| 401 | Authorization information is missing or invalid. |
| 404 | Entity not found. |
| 5XX | Unexpected error. |
