import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt } from "@graphprotocol/graph-ts"
import { TaskCreated } from "../generated/schema"
import { TaskCreated as TaskCreatedEvent } from "../generated/Todos/Todos"
import { handleTaskCreated } from "../src/todos"
import { createTaskCreatedEvent } from "./todos-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let id = BigInt.fromI32(234)
    let task = "Example string value"
    let completed = "boolean Not implemented"
    let newTaskCreatedEvent = createTaskCreatedEvent(id, task, completed)
    handleTaskCreated(newTaskCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("TaskCreated created and stored", () => {
    assert.entityCount("TaskCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "TaskCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "task",
      "Example string value"
    )
    assert.fieldEquals(
      "TaskCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "completed",
      "boolean Not implemented"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
