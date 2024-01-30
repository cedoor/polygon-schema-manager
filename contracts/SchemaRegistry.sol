// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.16;

/**
 * @title SchemaRegistry
 * @dev Smart Contract for Polygon Schema Methods
 */
contract SchemaRegistry {
    address private owner;

    struct Schema {
        string schemaJson;
    }

    mapping(address => mapping(string => Schema)) private schemas;

    event TransferOwnership(address indexed newOwner);
    event SchemaCreate(address indexed id, string schemaId, string schemaJson);
    bool private initialized;

    /**
     * @dev Initializes the ownership of the contract.
     */
    function initialize() public {
        require(!initialized, "Contract instance has already been initialized");
        initialized = true;
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Message sender is not the owner");
        _;
    }

    /**
     * @dev Transfers the ownership of the contract.
     * @param _newOwner Address of the new owner.
     * @return Message indicating the success or failure of ownership transfer.
     */
    function transferOwnership(address _newOwner) public onlyOwner returns (string memory) {
        if (owner != _newOwner) {
            owner = _newOwner;
            emit TransferOwnership(owner);
            return "Ownership transferred successfully";
        } else {
            return "Ownership cannot be transferred to the same account";
        }
    }

    /*
     * @dev Reads the contract owner from the chain.
     * @return The address of the contract owner.
     */
    function getOwner() public view returns (address _owner) {
        return owner;
    }

    /*
     * @dev Creates a new schema.
     * @param _id Address identifier.
     * @param newSchemaId Identifier for the new schema.
     * @param _json JSON representation of the schema.
     * @return The created schema ID.
     */
    function createSchema(address _id, string memory newSchemaId, string memory _json) public returns (string memory schemaId) {
        Schema memory newSchema = Schema(_json);
        schemas[_id][newSchemaId] = newSchema;

        emit SchemaCreate(msg.sender, newSchemaId, _json);
        return newSchemaId;
    }

    /**
     * @dev Gets a schema by its ID.
     * @param _id Address identifier.
     * @param _schemaId Identifier of the schema.
     * @return The schema object.
     */
    function getSchemaById(address _id, string memory _schemaId) external view returns (Schema memory) {
        Schema memory schema = schemas[_id][_schemaId];
        return schema;
    }
}
